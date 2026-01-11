import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { CustService } from './cust.service';
import { CreateCustDto } from './dto/create-cust.dto';
import { UpdateCustDto } from './dto/update-cust.dto';

@Controller('cust')
export class CustController {
  constructor(private readonly custService: CustService) {}

  @Post()
  create(@Body() createCustDto: CreateCustDto) {
    return this.custService.create(createCustDto);
  }

  @Get()
  findAll() {
    return this.custService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.custService.findOne(code.trim());
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.custService.searchCusts(query);
  }
  
  @Get(':cust_code/orders')
  getOrders(@Param('cust_code') cust_code: string) {
    return this.custService.getOrdersByCustomer(cust_code);
  }

  @Get('proj/:project_code/orders')
  getOrdersByProject(@Param('project_code') project_code: string) {
    return this.custService.getOrdersByProject(project_code);
  }

  @Patch(':cust_code')
  update(@Param('cust_code') cust_code: string, @Body() updateCustDto: UpdateCustDto) {
    return this.custService.update(cust_code, updateCustDto);
  }

  @Delete(':cust_code')
  remove(@Param('cust_code') cust_code: string) {
    return this.custService.remove(cust_code);
  }
}
