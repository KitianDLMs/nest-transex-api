import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cust } from './entities/cust.entity';
import { CreateCustDto } from './dto/create-cust.dto';
import { UpdateCustDto } from './dto/update-cust.dto';
import { Ordr } from 'src/ordr/entities/ordr.entity';

@Injectable()
export class CustService {
  constructor(
    @InjectRepository(Cust)
    private custRepository: Repository<Cust>,
    @InjectRepository(Ordr)
    private orderRepository: Repository<Ordr>,
  ) {}

  create(createCustDto: CreateCustDto) {
    const cust = this.custRepository.create(createCustDto);
    return this.custRepository.save(cust);
  }

  findAll() {
    return this.custRepository.find();
  }

  async getOrdersByProject(proj_code: string): Promise<Ordr[]> {
    return this.orderRepository.find({
      where: { proj_code },
      order: { order_date: 'DESC' }
    });
  }

  async findOne(cust_code: string) {
    const cust = await this.custRepository.findOne({
      where: { cust_code: cust_code.trim() },
      // relations: [
      //   // 'projs',
      //   // 'orders',        
      //   // 'orders.tickets'
      // ]
    });

    if (!cust) {
      throw new NotFoundException(`Cliente ${cust_code} no existe`);
    }

    return cust;
  }

  async getOrdersByCustomer(cust_code: string): Promise<Ordr[]> {
    // Asumiendo que la entidad Order tiene un campo cust_code
    return this.orderRepository.find({
      where: { cust_code },
      order: { order_date: 'DESC' } // opcional: orden por fecha
    });
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

  async searchCusts(term: string): Promise<Cust[]> {
    if (!term) return [];
    
    return this.custRepository.createQueryBuilder('cust')
      .where('cust.name ILIKE :term', { term: `%${term}%` })
      .limit(50)
      .getMany();
  }
}
