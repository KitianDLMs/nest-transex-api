import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imst } from './entities/imst.entity';
import { CreateImstDto } from './dto/create-imst.dto';
import { UpdateImstDto } from './dto/update-imst.dto';

@Injectable()
export class ImstService {
  constructor(
    @InjectRepository(Imst)
    private readonly imstRepository: Repository<Imst>,
  ) {}

  create(createImstDto: CreateImstDto) {
    const imst = this.imstRepository.create(createImstDto);
    return this.imstRepository.save(imst);
  }

  findAll() {
    return this.imstRepository.find();
  }

  findOne(item_code: string) {
    return this.imstRepository.findOne({ where: { item_code } });
  }

  update(item_code: string, updateImstDto: UpdateImstDto) {
    return this.imstRepository.update(item_code, updateImstDto);
  }

  remove(item_code: string) {
    return this.imstRepository.delete(item_code);
  }

  async deleteAllImst() {
    const allImst = await this.imstRepository.find();
    if (allImst.length > 0) {
      await this.imstRepository.remove(allImst);
    }
  }

}
