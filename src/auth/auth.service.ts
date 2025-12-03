import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }


  async getAllUsers() {
    return await this.userRepository.find();
  }

  async updateUser(id: string, data: any) {
    await this.userRepository.update(id, data);
    return this.userRepository.findOneBy({ id });
  }

  async create( createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        user: user,
        token: this.getJwtToken({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

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
      token: this.getJwtToken({ id: user.id })
    };
  }

  async checkAuthStatus( user: User ){

    return {
      user: user,
      token: this.getJwtToken({ id: user.id })
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


}
