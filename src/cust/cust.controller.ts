import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
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


  @Patch(':cust_code')
  update(@Param('cust_code') cust_code: string, @Body() updateCustDto: UpdateCustDto) {
    return this.custService.update(cust_code, updateCustDto);
  }

  @Delete(':cust_code')
  remove(@Param('cust_code') cust_code: string) {
    return this.custService.remove(cust_code);
  }
}
