import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdlService } from './ordl.service';
import { CreateOrdlDto } from './dto/create-ordl.dto';
import { UpdateOrdlDto } from './dto/update-ordl.dto';

@Controller('ordl')
export class OrdlController {
  constructor(private readonly ordlService: OrdlService) {}

  @Post()
  create(@Body() createOrdlDto: CreateOrdlDto) {
    return this.ordlService.create(createOrdlDto);
  }

  @Get()
  findAll() {
    return this.ordlService.findAll();
  }

  @Get(':order_date/:order_code/:order_intrnl_line_num')
  findOne(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('order_intrnl_line_num') order_intrnl_line_num: number,
  ) {
    return this.ordlService.findOne(new Date(order_date), order_code, order_intrnl_line_num);
  }

  @Patch(':order_date/:order_code/:order_intrnl_line_num')
  update(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('order_intrnl_line_num') order_intrnl_line_num: number,
    @Body() updateOrdlDto: UpdateOrdlDto,
  ) {
    return this.ordlService.update(new Date(order_date), order_code, order_intrnl_line_num, updateOrdlDto);
  }

  @Delete(':order_date/:order_code/:order_intrnl_line_num')
  remove(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('order_intrnl_line_num') order_intrnl_line_num: number,
  ) {
    return this.ordlService.remove(new Date(order_date), order_code, order_intrnl_line_num);
  }
}
