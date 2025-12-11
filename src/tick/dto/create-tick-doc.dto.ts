import { IsString } from "class-validator";

export class CreateTickDocDto {
  @IsString()
  filename: string;

  @IsString()
  url: string;

  @IsString()
  mimetype: string;
}
