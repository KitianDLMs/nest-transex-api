import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imst } from './entities/imst.entity';
import { CreateImstDto } from './dto/create-imst.dto';
import { UpdateImstDto } from './dto/update-imst.dto';
import { Prjp } from 'src/prjp/entities/prjp.entity';
import { Ordl } from 'src/ordl/entities/ordl.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImstService {
  constructor(
    @InjectRepository(Imst)
    private readonly imstRepository: Repository<Imst>,
    @InjectRepository(Prjp)
    private readonly prjpRepository: Repository<Prjp>,
    @InjectRepository(Ordl)
    private readonly ordlRepository: Repository<Ordl>,
  ) {}

  // create(createImstDto: CreateImstDto) {
  //   const imst = this.imstRepository.create(createImstDto);
  //   return this.imstRepository.save(imst);
  // }

  async create(dto: CreateImstDto) {
  // 1. Crear producto IMST
  const prod = await this.imstRepository.save(dto);

    // 2. Obtener línea disponible para PRJP
    const lastLine = await this.prjpRepository
      .createQueryBuilder('p')
      .select('MAX(p.intrnl_line_num)', 'max')
      .where('p.proj_code = :proj', { proj: dto.proj_code })
      .getRawOne();

    const nextLine = (lastLine?.max ?? 0) + 1;

    // 3. Crear PRJP sin duplicar PK
    await this.prjpRepository.save({
      proj_code: dto.proj_code,
      item_code: dto.item_code,
      cust_code: dto.cust_code,
      intrnl_line_num: nextLine,
    });

    // 4. Crear ORDL
    await this.ordlRepository.save({
      order_date: new Date(),           // PK 1
      order_code: uuid(),               // PK 2
      order_intrnl_line_num: 1,         // PK 3
      order_qty_uom: dto.order_uom,
      price_uom: dto.price_uom
    });

    return prod;
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

  async findByCustomer(cust_code: string) {
    return this.imstRepository.find({
      where: { cust_code },
    });
  }

  async findByProject(proj_code: string) {
    return this.imstRepository.find({
      where: { proj_code },
    });
  }
}
