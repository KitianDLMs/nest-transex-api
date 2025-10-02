import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Obra } from './entities/obra.entity';
import { ObraImage } from './entities/obra-image.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ObraService {
  private readonly logger = new Logger('ObraService');

  constructor(
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,

    @InjectRepository(ObraImage)
    private readonly obraImageRepository: Repository<ObraImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createObraDto: CreateObraDto, user: User) {
    try {
      const { images = [], ...obraDetails } = createObraDto;

      const obra = this.obraRepository.create({
        ...obraDetails,
        images: images.map((url) => this.obraImageRepository.create({ url })),
        user,
      });

      await this.obraRepository.save(obra);

      return {
        ...obra,
        images: obra.images.map((img) => img.url),
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [obras, total] = await this.obraRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['images', 'user'],
      order: { id: 'ASC' },
    });

    return {
      count: total,
      pages: Math.ceil(total / limit),
      obras: obras.map((obra) => ({
        ...obra,
        images: obra.images.map((img) => img.url),
      })),
    };
  }

  async findOnePlain(term: string) {
    let obra: Obra;

    if (term.match(/^[0-9a-fA-F-]{36}$/)) {
      // es UUID
      obra = await this.obraRepository.findOne({
        where: { id: term },
        relations: ['images', 'user'],
      });
    } else {
      obra = await this.obraRepository.findOne({
        where: { name: term },
        relations: ['images', 'user'],
      });
    }

    if (!obra) throw new NotFoundException(`Obra "${term}" not found`);

    return {
      ...obra,
      images: obra.images.map((img) => img.url),
    };
  }

  async update(id: string, updateObraDto: UpdateObraDto, user: User) {
    const { images, ...toUpdate } = updateObraDto;

    const obra = await this.obraRepository.preload({ id, ...toUpdate });

    if (!obra) throw new NotFoundException(`Obra with id: ${id} not found`);

    // QueryRunner para manejar transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ObraImage, { obra: { id } });
        obra.images = images.map((url) => this.obraImageRepository.create({ url }));
      }

      obra.user = user;

      await queryRunner.manager.save(obra);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const obra = await this.findOnePlain(id);
    await this.obraRepository.remove(obra as any);
    return { message: 'Obra deleted' };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
