import { PartialType } from '@nestjs/mapped-types';
import { CreateTickDto } from './create-tick.dto';

export class UpdateTickDto extends PartialType(CreateTickDto) {}
