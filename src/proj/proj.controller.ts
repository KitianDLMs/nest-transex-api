import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjService } from './proj.service';
import { Proj } from './entities/proj.entity';
import { CreateProjDto } from './dto/create-proj.dto';

@Controller('proj')
export class ProjController {
  constructor(private readonly projService: ProjService) {}

  @Get()
  findAll() {
    return this.projService.findAll();
  }

  @Get('by-cust/:cust_code')
  findByCust(@Param('cust_code') cust_code: string) {
    return this.projService.findByCust(cust_code);
  }

  @Get('/:proj_code')
  findOne(    
    @Param('proj_code') proj_code: string,
  ) {
    return this.projService.findOne(proj_code);
  }

  @Post()
  create(@Body() dto: CreateProjDto) {
    return this.projService.create(dto);
  }

  @Put('/:proj_code')
  update(    
    @Param('proj_code') proj_code: string,
    @Body() dto: Partial<Proj>,
  ) {
    return this.projService.update(proj_code, dto);
  }

  @Delete('/:proj_code')
  delete(      
    @Param('proj_code') proj_code: string,
  ) {
    return this.projService.delete(proj_code);
  }
}
