import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { SchlService } from './schl.service';
import { CreateSchlDto } from './dto/create-schl.dto';
import { UpdateSchlDto } from './dto/update-schl.dto';

@Controller('schl')
export class SchlController {
  constructor(private readonly schlService: SchlService) {}

  @Post()
  create(@Body() dto: CreateSchlDto) {
    return this.schlService.create(dto);
  }

  @Get()
  findAll(
    @Query('order_date') order_date?: string,
    @Query('order_code') order_code?: string,
  ) {
    return this.schlService.findAll(order_date, order_code);
  }

  @Get(':order_date/:order_code/:order_intrnl_line_num/:sched_num/:unique_num')
  findOne(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('order_intrnl_line_num') order_intrnl_line_num: number,
    @Param('sched_num') sched_num: number,
    @Param('unique_num') unique_num: number,
  ) {
    return this.schlService.findOne(
      order_date,
      order_code,
      +order_intrnl_line_num,
      +sched_num,
      +unique_num,
    );
  }

  @Patch(':order_date/:order_code/:order_intrnl_line_num/:sched_num/:unique_num')
  update(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('order_intrnl_line_num') order_intrnl_line_num: number,
    @Param('sched_num') sched_num: number,
    @Param('unique_num') unique_num: number,
    @Body() dto: UpdateSchlDto,
  ) {
    return this.schlService.update(
      order_date,
      order_code,
      +order_intrnl_line_num,
      +sched_num,
      +unique_num,
      dto,
    );
  }

  @Delete(':order_date/:order_code/:order_intrnl_line_num/:sched_num/:unique_num')
  remove(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('order_intrnl_line_num') order_intrnl_line_num: number,
    @Param('sched_num') sched_num: number,
    @Param('unique_num') unique_num: number,
  ) {
    return this.schlService.remove(
      order_date,
      order_code,
      +order_intrnl_line_num,
      +sched_num,
      +unique_num,
    );
  }
}
