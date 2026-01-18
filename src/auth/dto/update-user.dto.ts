import { IsArray, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  fullName?: string;
  email?: string;
  roles?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projects?: string[];

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
