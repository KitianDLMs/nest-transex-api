import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdlDto } from './create-ordl.dto';

export class UpdateOrdlDto extends PartialType(CreateOrdlDto) {}
