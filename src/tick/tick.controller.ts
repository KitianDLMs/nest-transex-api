import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { TickService } from './tick.service';
import { CreateTickDto } from './dto/create-tick.dto';
import { UpdateTickDto } from './dto/update-tick.dto';

@Controller('tick')
export class TickController {
  constructor(private readonly tickService: TickService) {}

  @Post()
  create(@Body() dto: CreateTickDto) {
    return this.tickService.create(dto);
  }

  @Get()
  findAll() {
    return this.tickService.findAll();
  }

  @Get(':order_date/:order_code/:tkt_code')
  findOne(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
  ) {
    return this.tickService.findOne(order_date, order_code, tkt_code);
  }

  @Patch(':order_date/:order_code/:tkt_code')
  update(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
    @Body() dto: UpdateTickDto,
  ) {
    return this.tickService.update(order_date, order_code, tkt_code, dto);
  }

  @Delete(':order_date/:order_code/:tkt_code')
  remove(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
  ) {
    return this.tickService.remove(order_date, order_code, tkt_code);
  }
}
