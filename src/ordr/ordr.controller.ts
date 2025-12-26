import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdrService } from './ordr.service';
import { CreateOrdrDto } from './dto/create-ordr.dto';
import { UpdateOrdrDto } from './dto/update-ordr.dto';
import { ProjService } from 'src/proj/proj.service';

@Controller('ordr')
export class OrdrController {
  constructor(
    private readonly ordrService: OrdrService,
    private readonly projService: ProjService,
  ) {}

  @Post()
  create(@Body() createOrdrDto: CreateOrdrDto) {
    return this.ordrService.create(createOrdrDto);
  }

  // @Get(':cust_code')
  // findByCust(@Param('cust_code') cust_code: string) {
  //   return this.ordrService.findByCust(cust_code.trim());
  // }

  @Get('by-customer/:cust_code')
  findByCustomerPaginated(
    @Param('cust_code') cust_code: string,
    @Query('proj_code') proj_code?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.ordrService.findByCustomerPaginated(
      cust_code.trim(),
      proj_code?.trim(),
      Number(page),
      Number(limit),
    );
  }

  // @Get(':cust_code')
  // findByCust(@Param('cust_code') cust_code: string) {
  //   return this.ordrService.findByCust(cust_code.trim());
  // } 


  @Get()
  filterOrders(
    @Query('cust_code') cust_code?: string,
    @Query('proj_code') proj_code?: string,
  ) {
    return this.ordrService.filter(
      cust_code?.trim(),
      proj_code?.trim(),
    );
  }

  @Get('projects-by-customer')
  getProjectsByCustomer(
    @Query('custCode') custCode: string
  ) {
    return this.ordrService.findProjectsByCustomer(custCode);
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
    return this.ordrService.remove(order_code.trim());
  }
}
