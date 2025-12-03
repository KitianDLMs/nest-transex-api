import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrjpService } from './prjp.service';
import { CreatePrjpDto } from './dto/create-prjp.dto/create-prjp.dto';
import { UpdatePrjpDto } from './dto/update-prjp.dto/update-prjp.dto';

@Controller('prjp')
export class PrjpController {
  constructor(private readonly prjpService: PrjpService) {}

  @Post()
  create(@Body() dto: CreatePrjpDto) {
    return this.prjpService.create(dto);
  }

  @Get()
  findAll() {
    return this.prjpService.findAll();
  }

  @Get(':cust_code/:proj_code/:intrnl_line_num')
  findOne(
    @Param('cust_code') cust_code: string,
    @Param('proj_code') proj_code: string,
    @Param('intrnl_line_num') intrnl_line_num: number,
  ) {
    return this.prjpService.findOne(cust_code, proj_code, intrnl_line_num);
  }

  @Patch(':cust_code/:proj_code/:intrnl_line_num')
  update(
    @Param('cust_code') cust_code: string,
    @Param('proj_code') proj_code: string,
    @Param('intrnl_line_num') intrnl_line_num: number,
    @Body() dto: UpdatePrjpDto,
  ) {
    return this.prjpService.update(cust_code, proj_code, intrnl_line_num, dto);
  }

  @Delete(':cust_code/:proj_code/:intrnl_line_num')
  remove(
    @Param('cust_code') cust_code: string,
    @Param('proj_code') proj_code: string,
    @Param('intrnl_line_num') intrnl_line_num: number,
  ) {
    return this.prjpService.remove(cust_code, proj_code, intrnl_line_num);
  }
}
