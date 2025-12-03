import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdrService } from './ordr.service';
import { CreateOrdrDto } from './dto/create-ordr.dto';
import { UpdateOrdrDto } from './dto/update-ordr.dto';

@Controller('ordr')
export class OrdrController {
  constructor(private readonly ordrService: OrdrService) {}

  @Post()
  create(@Body() createOrdrDto: CreateOrdrDto) {
    return this.ordrService.create(createOrdrDto);
  }

  @Get()
  findAll() {
    return this.ordrService.findAll();
  }

  @Get('/:order_code')
  findOne(@Param('order_code') order_code: string) {
    return this.ordrService.findOne(order_code);
  }

  @Patch(':order_code')
  update(
    @Param('order_code') order_code: string,
    @Body() updateOrdrDto: UpdateOrdrDto,
  ) {
    return this.ordrService.update(order_code.trim(), updateOrdrDto);
  }


  @Delete('/:order_code')
  remove(@Param('order_code') order_code: string) {
    return this.ordrService.remove(order_code);
  }

  @Get('by-cust/:cust_code')
  findByCust(@Param('cust_code') cust_code: string) {
    return this.ordrService.findByCust(cust_code);
  }

}
