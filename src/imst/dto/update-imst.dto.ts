import { PartialType } from '@nestjs/mapped-types';
import { CreateImstDto } from './create-imst.dto';

export class UpdateImstDto extends PartialType(CreateImstDto) {}
