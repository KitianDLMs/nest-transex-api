import { PartialType } from '@nestjs/mapped-types';
import { CreateCustDto } from './create-cust.dto';

export class UpdateCustDto extends PartialType(CreateCustDto) {}
