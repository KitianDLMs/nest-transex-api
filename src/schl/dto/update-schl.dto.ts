import { PartialType } from '@nestjs/mapped-types';
import { CreateSchlDto } from './create-schl.dto';

export class UpdateSchlDto extends PartialType(CreateSchlDto) {}
