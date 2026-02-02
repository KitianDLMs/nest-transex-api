import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordr } from './entities/ordr.entity';
import { CreateOrdrDto } from './dto/create-ordr.dto';
import { UpdateOrdrDto } from './dto/update-ordr.dto';
import axios from 'axios';

@Injectable()
export class OrdrService {

  private readonly authBody = {
    Username: 'CMORALES',
    Password: '1DUhddinUPHWZ96z',
  };

  constructor(
    @InjectRepository(Ordr)
    private readonly ordrRepository: Repository<Ordr>,
  ) {}

  async findProjectsByCustomer(custCode: string) {
    return this.ordrRepository.query(
      `
      SELECT DISTINCT
        TRIM(o.proj_code) AS proj_code
      FROM ordr o
      WHERE TRIM(o.cust_code) = $1
        AND o.proj_code IS NOT NULL
      ORDER BY proj_code
      `,
      [custCode.trim()]
    );
  }

  private async getJwt(): Promise<string> {
    try {
      const response = await axios.post(
        'http://190.153.216.170/ApiSamtech/api/login/authenticate',
        this.authBody,
        { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
      );

      let token = response.data;
      if (typeof token === 'string') {
        token = token.replace(/^"|"$/g, '');
      }

      if (!token) {
        console.error('Respuesta completa de la API:', response.data);
        throw new Error('No se recibió token en la respuesta');
      }
      return token;
    } catch (error) {
      console.error('Error generando JWT:', error?.response?.data || error.message);
      throw new Error('No se pudo generar el token JWT');
    }
  }

  async getProgramaPorPedido(order_code: string, order_date: string) {
    if (!order_code || !order_date) {
      throw new Error('order_code y order_date son requeridos');
    }

    const url = 'http://190.153.216.170/ApiSamtech/api/programa/por_pedido';

    try {
      const token = await this.getJwt();
      const response = await axios.get(url, {
        params: {
          order_code: order_code.trim(),
          order_date: order_date.trim(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 60000,
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error API Samtech (programa por pedido):',
        error?.response?.data || error.message,
      );
      throw new Error('Error al consultar programa por pedido');
    }
  }

  async getPedidosPorProyectoExterno(
    projCode: string,
    custCode: string,
  ) {    
    const url =
      'http://190.153.216.170/ApiSamtech/api/pedido/pedido_proyecto';

    try {
      const token = await this.getJwt();
      const response = await axios.get(url, {
        params: {
          proj_code: projCode.trim(),
          cust_code: custCode.trim(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 60000,
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error API Samtech:',
        error?.response?.data || error.message,
      );
      throw new Error('Error al consultar pedidos externos');
    }
  }

  async   getPedidosPorCliente(custCode: string) {
    if (!custCode) {
      throw new Error('cust_code es requerido');
    }

    const url =
      'http://190.153.216.170/ApiSamtech/api/pedido/pedido_cliente';

    try {
      const token = await this.getJwt();
      const response = await axios.post(
        url,
        {
          cust_code: custCode.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 60000,
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error API Samtech:',
        error?.response?.data || error.message,
      );
      throw new Error('Error al consultar pedidos por cliente');
    }
  }

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

  findByCust(cust_code: string) {
    const clean = cust_code.trim();
    return this.ordrRepository.find({
      where: { cust_code: clean },
    });
  }

  async findByCustomerPaginated(
    custCode: string,
    projCode?: string,
    page = 1,
    limit = 10,
  ) {
    const qb = this.ordrRepository
      .createQueryBuilder('o')
      .where('TRIM(o.cust_code) = :custCode', {
        custCode: custCode.trim(),
      });

    if (projCode && projCode.trim() !== '') {
      qb.andWhere('TRIM(o.proj_code) = :projCode', {
        projCode: projCode.trim(),
      });
    }

    qb.orderBy('o.order_date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

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
