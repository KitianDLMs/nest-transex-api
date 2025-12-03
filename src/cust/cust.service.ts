import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cust } from './entities/cust.entity';
import { CreateCustDto } from './dto/create-cust.dto';
import { UpdateCustDto } from './dto/update-cust.dto';

@Injectable()
export class CustService {
  constructor(
    @InjectRepository(Cust)
    private custRepository: Repository<Cust>,
  ) {}

  create(createCustDto: CreateCustDto) {
    const cust = this.custRepository.create(createCustDto);
    return this.custRepository.save(cust);
  }

  findAll() {
    return this.custRepository.find();
  }

  async findOne(cust_code: string) {
    const cust = await this.custRepository.findOne({
      where: { cust_code: cust_code.trim() },
      relations: [
        'projs',
        'orders',        
        'orders.tickets'
      ]
    });

    if (!cust) {
      throw new NotFoundException(`Cliente ${cust_code} no existe`);
    }

    return cust;
  }

  update(cust_code: string, updateCustDto: UpdateCustDto) {
    return this.custRepository.update(
      { cust_code: cust_code.trim() },
      updateCustDto
    );
  }


  remove(cust_code: string) {
    return this.custRepository.delete(cust_code);
  }

  async deleteAllCust() {
    const query = this.custRepository.createQueryBuilder();
    await query
      .delete()
      .where({})
      .execute();
  }

}
