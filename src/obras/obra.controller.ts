import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ObraService } from './obra.service';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from '../auth/interfaces';
import { Obra } from './entities/obra.entity';

@ApiTags('Obras')
@Controller('obras')
export class ObraController {
  constructor(private readonly obraService: ObraService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Obra was created', type: Obra })
  create(@Body() createObraDto: CreateObraDto, @GetUser() user: User) {
    return this.obraService.create(createObraDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.obraService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.obraService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateObraDto: UpdateObraDto,
    @GetUser() user: User,
  ) {
    return this.obraService.update(id, updateObraDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.obraService.remove(id);
  }
}
