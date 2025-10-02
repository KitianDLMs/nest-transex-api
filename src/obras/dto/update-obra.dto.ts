// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateObraDto } from './create-obra.dto';

export class UpdateObraDto extends PartialType(CreateObraDto) {}
