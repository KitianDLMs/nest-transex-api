import { 
  IsEmail, 
  IsString, 
  Matches, 
  MaxLength, 
  MinLength, 
  IsArray, 
  IsInt,
  ArrayNotEmpty,
  IsOptional 
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'The password must have an uppercase, lowercase letter and a number' }
  )
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;

  @IsString()
  @MinLength(1)
  cust_code: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  proj_ids?: number[];

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  roles?: string[];  
}
