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

  @Get(':item_code')
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
}
