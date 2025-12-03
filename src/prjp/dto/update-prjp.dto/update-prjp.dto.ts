import { PartialType } from '@nestjs/mapped-types';
import { CreatePrjpDto } from './../create-prjp.dto/create-prjp.dto';

export class UpdatePrjpDto extends PartialType(CreatePrjpDto) {}
