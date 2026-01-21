import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Length
} from 'class-validator';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];

  @IsOptional()
  @IsString()
  @Length(8, 13)
  cust_code?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cust_codes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projects?: string[];

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
