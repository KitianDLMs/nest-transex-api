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
      select: ['id', 'fullName', 'email', 'roles', 'cust_code', 'cust_codes', 'isActive', 'projects'],
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

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    let projectCodes: string[] = [];

    if (Array.isArray(dto.projects)) {
      projectCodes = dto.projects
        .map((p: any) => {
          if (typeof p === 'string') return p.trim();
          if (p && typeof p === 'object' && p.projcode) return p.projcode.trim();
          return '';
        })
        .filter(code => code !== '');
    }

    user.projects = projectCodes;

    if (dto.fullName) user.fullName = dto.fullName;
    if (dto.email) user.email = dto.email.toLowerCase();
    if (dto.roles) user.roles = dto.roles;

    if (dto.password && dto.password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(dto.password, salt);
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


  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, fullName: true, isActive: true, roles: true}
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;

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
