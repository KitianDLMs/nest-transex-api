import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  fullName?: string;
  email?: string;
  roles?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projects?: string[];
}
