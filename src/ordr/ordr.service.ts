import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordr } from './entities/ordr.entity';
import { CreateOrdrDto } from './dto/create-ordr.dto';
import { UpdateOrdrDto } from './dto/update-ordr.dto';

@Injectable()
export class OrdrService {
  constructor(
    @InjectRepository(Ordr)
    private readonly ordrRepository: Repository<Ordr>,
  ) {}

  create(createOrdrDto: CreateOrdrDto) {
    const entity = this.ordrRepository.create(createOrdrDto);
    return this.ordrRepository.save(entity);
  }

  findAll() {
    return this.ordrRepository.find();
  }

  findOne(order_code: string) {
    return this.ordrRepository.findOneBy({ order_code });
  }

  update(order_code: string, updateOrdrDto: UpdateOrdrDto) {
    return this.ordrRepository.update({ order_code }, updateOrdrDto);
  }

  remove(order_code: string) {
    return this.ordrRepository.delete({ order_code });
  }

  async deleteAllOrdr() {
    const allOrdr = await this.ordrRepository.find();
    if (allOrdr.length > 0) {
      await this.ordrRepository.remove(allOrdr);
    }
  }

  // ✔ Búsqueda por cliente aplicando TRIM
  findByCust(cust_code: string) {
    const clean = cust_code.trim();
    return this.ordrRepository.find({
      where: { cust_code: clean },
    });
  }

  // ✔ Filtro por cliente y proyecto con TRIM en ambas columnas
  async filter(cust?: string, proj?: string) {
    const qb = this.ordrRepository.createQueryBuilder('o');

    if (cust) {
      qb.andWhere('TRIM(o.cust_code) = :cust', { cust: cust.trim() });
    }

    if (proj && proj.trim() !== '') {
      qb.andWhere('TRIM(o.proj_code) = :proj', { proj: proj.trim() });
    }

    return qb.orderBy('o.order_date', 'DESC').getMany();
  }
}
