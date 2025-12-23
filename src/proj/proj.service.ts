import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proj } from './entities/proj.entity';
import { CreateProjDto } from './dto/create-proj.dto';

@Injectable()
export class ProjService {
  constructor(
    @InjectRepository(Proj)
    private readonly projRepo: Repository<Proj>,
  ) {}

  async findByCustomer(cust_code: string) {
    return this.projRepo.find({
      where: { cust_code }
    });
  }


  async getOptions() {
  return this.projRepo
      .createQueryBuilder('proj')
      .select(['proj.proj_code', 'proj.proj_name'])
      .orderBy('proj.proj_code', 'ASC')
      .getMany();
  }


  async findAll() {
    return this.projRepo
      .createQueryBuilder('proj')
      .select([
        'proj.proj_code',
        'proj.proj_name',
        'proj.cust_code',
      ])
      .getRawMany();
  }

  async findOne(proj_code: string) {
    const proj = await this.projRepo.findOne({
      where: { proj_code },
    });

    if (!proj) throw new NotFoundException('Proyecto no encontrado');

    return proj;
  }

  create(dto: CreateProjDto) {
    const proj = this.projRepo.create(dto);
    return this.projRepo.save(proj);
  }

  async update(proj_code: string, dto: Partial<Proj>) {
    const proj = await this.findOne(proj_code);
    Object.assign(proj, dto);
    return this.projRepo.save(proj);
  }

  async delete(proj_code: string) {
    const proj = await this.findOne(proj_code);
    await this.projRepo.remove(proj);
    return { message: 'Proyecto eliminado' };
  }

  async findByCust(cust_code: string) {
    return this.projRepo
      .createQueryBuilder('proj')
      .select([
        'proj.proj_code',
        'proj.proj_name',
      ])
      .where('TRIM(proj.cust_code) = :cust', {
        cust: cust_code.trim(),
      })
      .getRawMany();
  }

  async deleteAllProj() {
    const allProj = await this.projRepo.find();
    if (allProj.length > 0) {
      await this.projRepo.remove(allProj);
    }
  }
}
