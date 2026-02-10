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

  @Get('all-by-customer')
  getAllOrdersByCustomer(@Query('cust_code') custCode: string) {
    if (!custCode) throw new Error('cust_code es requerido');
    // Trae todos los pedidos locales, sin filtrar por fecha
    return this.ordrService.findByCust(custCode.trim());
  }

  @Get('external/avance-pedido')
  getAvance(
    @Query('order_code') orderCode: string,
    @Query('order_date') orderDate: string
  ) {
    return this.ordrService.getAvancePedido(orderCode, orderDate);
  }

  @Get('external/programa')
  getProgramaPorPedido(
    @Query('order_code') order_code: string,
    @Query('order_date') order_date: string,
  ) {
    if (!order_code || !order_date) {
      throw new Error('order_code y order_date son requeridos');
    }
    return this.ordrService.getProgramaPorPedido(order_code, order_date);
  }

  @Get('external/by-customer')
  getPedidosPorCliente(@Query('cust_code') custCode: string) {
    if (!custCode) {
      throw new Error('cust_code es requerido');
    }

    return this.ordrService.getPedidosPorCliente(custCode);
  }

  @Get('external/by-project')
  getPedidosExternosPorProyecto(
    @Query('proj_code') projCode: string,
    @Query('cust_code') custCode: string,
  ) {
    if (!projCode || !custCode) {
      throw new Error('proj_code y cust_code son requeridos');
    } 

    return this.ordrService.getPedidosPorProyectoExterno(
      projCode,
      custCode,
    );
  }

  @Get('external/futuros')
  getPedidosFuturosExternosPorProyecto(
    @Query('proj_code') projCode: string,
    @Query('cust_code') custCode: string,
  ) {
    if (!projCode || !custCode) {
      throw new Error('proj_code y cust_code son requeridos');
    } 

    return this.ordrService.getPedidosFuturosPorProyectoExterno(
      projCode,
      custCode,
    );
  }

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
