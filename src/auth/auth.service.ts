import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersPaginatedResponse } from './interfaces/users-paginated-response.interface';
import { Proj } from 'src/proj/entities/proj.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Proj)
    private readonly projRepository: Repository<Proj>,

    private readonly jwtService: JwtService,
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'fullName', 'email', 'rut', 'roles', 'cust_code', 'cust_codes', 'isActive', 'projects'],
    });

    if (!user) throw new NotFoundException(`User not found`);

    let projs: any[] = [];

    if (user.cust_code && Array.isArray(user.projects)) {  
      const allProjects = await this.projRepository.find({
        where: { cust_code: user.cust_code },
        select: ['proj_code', 'proj_name'],
      });
      
      projs = allProjects
        .filter(p => user.projects.includes(p.proj_code))
        .map(p => ({ projcode: p.proj_code, projname: p.proj_name }));
    }

    return {
      ...user,
      projs,
    };
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }  

  private normalizeRut(rut: string): string {
    const clean = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    return `${clean.slice(0, -1)}-${clean.slice(-1)}`;
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    if (Array.isArray(dto.projects)) {
      user.projects = dto.projects
        .map((p: any) =>
          typeof p === 'string' ? p.trim() : p?.projcode?.trim()
        )
        .filter(Boolean);
    }
  
    if (dto.fullName) user.fullName = dto.fullName;
    if (dto.email) user.email = dto.email.toLowerCase();
    if (dto.roles) user.roles = dto.roles;
    if (dto.rut !== undefined) {
      user.rut = this.normalizeRut(dto.rut);
    }

    if (dto.password?.trim()) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(dto.password, salt);
    }
    
    const role = dto.roles?.[0];

    if (role === 'user') {
      user.cust_code = dto.cust_code ?? null;
      user.cust_codes = [];
    }

    if (role === 'admin' || role === 'super-user') {
      user.cust_codes = Array.isArray(dto.cust_codes)
        ? dto.cust_codes
        : [];
      user.cust_code = null;
    }
    return await this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, roles, cust_code, cust_codes, ...rest } = createUserDto;

      if (roles.includes('user')) {
        if (!cust_code || cust_code.trim().length === 0) {
          throw new BadRequestException('cust_code is required for role user');
        }
      }

      if (roles.includes('super-user')) {
        if (!cust_codes || !Array.isArray(cust_codes) || cust_codes.length === 0) {
          throw new BadRequestException('cust_codes is required for role super-user');
        }
      }

      const user = this.userRepository.create({
        ...rest,
        rut: this.normalizeRut(rest.rut),
        roles,
        cust_code: roles.includes('user') ? cust_code : null,
        cust_codes: roles.includes('super-user') ? cust_codes : null,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        user,
        token: this.getJwtToken({
          id: user.id,
          email: user.email,
          roles: user.roles,
          fullName: user.fullName,
        }),
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }


  async login(loginUserDto: LoginUserDto) {
    const { rut, password } = loginUserDto;

    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    const rutWithDash = `${body}-${dv}`;


    const user = await this.userRepository.findOne({
      where: { rut: rutWithDash },
      select: {
        rut: true,
        password: true,
        id: true,
        fullName: true,
        roles: true,
        email: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('Credenciales inválidas (rut)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales inválidas (password)');

    delete user.password;

    return {
      user,
      token: this.getJwtToken({
        id: user.id,
        email: user.email,
        roles: user.roles,
        fullName: user.fullName,
      }),
    };
  }

  async checkAuthStatus( user: User ){

    return {
      user: user,
      token: this.getJwtToken({ 
        id: user.id,
        email: user.email,
        roles: user.roles,
        fullName: user.fullName
      })
    };

  }


  
  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

  async getPaginatedUsers(page: number = 1, limit: number = 10): Promise<UsersPaginatedResponse> {  
    const take = limit > 0 ? limit : 10;
    const skip = (page > 0 ? page - 1 : 0) * take;

    const [users, totalItems] = await this.userRepository.findAndCount({
      skip,
      take,
      order: { fullName: 'ASC' }
    });

    const totalPages = Math.ceil(totalItems / take);

    return {
      data: users,
      page,
      limit: take,
      totalPages,
      totalItems,
    };
  }
}
