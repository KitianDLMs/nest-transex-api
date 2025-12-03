import { PartialType } from '@nestjs/mapped-types';
import { CreateProjDto } from './create-proj.dto';

export class UpdateProjDto extends PartialType(CreateProjDto) {}
