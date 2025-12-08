import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ImstService } from './imst.service';
import { CreateImstDto } from './dto/create-imst.dto';
import { UpdateImstDto } from './dto/update-imst.dto';

@Controller('imst')
export class ImstController {
  constructor(private readonly imstService: ImstService) {}

  @Post()
  create(@Body() createImstDto: CreateImstDto) {
    return this.imstService.create(createImstDto);
  }

  @Get()
  findAll() {
    return this.imstService.findAll();
  }

  @Get('item/:item_code')
  findOne(@Param('item_code') item_code: string) {
    return this.imstService.findOne(item_code);
  }

  @Patch(':item_code')
  update(@Param('item_code') item_code: string, @Body() updateImstDto: UpdateImstDto) {
    return this.imstService.update(item_code, updateImstDto);
  }

  @Delete(':item_code')
  remove(@Param('item_code') item_code: string) {
    return this.imstService.remove(item_code);
  }

  @Get('project/:proj_code')
  findByProject(@Param('proj_code') proj_code: string) {
    return this.imstService.findByProject(proj_code);
  }

  @Get('customer/:cust_code')
  findByCustomer(@Param('cust_code') cust_code: string) {
    return this.imstService.findByCustomer(cust_code);
  }

}
