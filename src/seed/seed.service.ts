import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';
import { ObraService } from 'src/obras/obra.service';
import { CustService } from 'src/cust/cust.service';
import { PrjpService } from 'src/prjp/prjp.service';
import { ImstService } from 'src/imst/imst.service';
import { Ordl } from '../ordl/entities/ordl.entity'; 
import { OrdlService } from 'src/ordl/ordl.service';
import { OrdrService } from 'src/ordr/ordr.service';
import { ProjService } from 'src/proj/proj.service';
import { CreateProjDto } from 'src/proj/dto/create-proj.dto';
import { CreateSchlDto } from 'src/schl/dto/create-schl.dto';
import { SchlService } from 'src/schl/schl.service';
import { TickService } from 'src/tick/tick.service';
import { Tick } from 'src/tick/entities/tick.entity';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,

    private readonly obraService: ObraService,    

    private readonly custService: CustService, 

    private readonly imstService: ImstService,     

    private readonly ordlService: OrdlService,
      
    private readonly ordrService: OrdrService,

    private readonly prjpService: PrjpService,        

    private readonly projService: ProjService,            

    private readonly schlService: SchlService,                

    private readonly tickService: TickService,                

    @InjectRepository( User )
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource 
  ) {}


  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewCust();
    await this.insertNewProj();
    await this.insertnewOrdr();
    // await this.insertNewProducts(adminUser);
    // await this.insertNewObras(adminUser);
    await this.insertNewOrdl();
    await this.insertNewPrjp();
    await this.insertNewSchl();
    await this.insertNewTick();
    await this.insertNewImst();
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.tickService.deleteAllTick(); 
    await this.schlService.deleteAllSchl();
    await this.ordrService.deleteAllOrdr();
    await this.ordlService.deleteAllOrdl();
    await this.prjpService.deleteAllPrjp();
    await this.productsService.deleteAllProducts();
    await this.imstService.deleteAllImst(); 
    await this.projService.deleteAllProj();
    await this.custService.deleteAllCust();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertUsers() {

    const seedUsers = initialData.users;
    
    const users: User[] = [];

    seedUsers.forEach( user => {
      users.push( this.userRepository.create( user ) )
    });

    const dbUsers = await this.userRepository.save( seedUsers )

    return dbUsers[0];
  }


  // private async insertNewProducts( user: User ) {
  //   await this.productsService.deleteAllProducts();

  //   const products = initialData.products;

  //   const insertPromises = [];

  //   products.forEach( product => {
  //     insertPromises.push( this.productsService.create( product, user ) );
  //   });

  //   await Promise.all( insertPromises );


  //   return true;
  // }

  //  private async insertNewObras(user: User) {
  //   const obras = initialData.obras;

  //   const insertPromises = obras.map(obra => this.obraService.create(obra, user));

  //   await Promise.all(insertPromises);

  //   return true;
  // }

  private async insertNewCust() {
    const custArray = initialData.cust;
    const insertPromises = custArray.map(cust =>
      this.custService.create({
        ...cust,
        cust_code: cust.cust_code.trim(),
        setup_date: new Date(cust.setup_date)
      })
    );
    await Promise.all(insertPromises);
    return true;
  }



  private async insertNewImst() {
      const imstArray = initialData.imst;

      const insertPromises = imstArray.map(imst =>
        this.imstService.create({
          ...imst,
          expir_date: cleanDate(imst.expir_date),
          update_date: cleanDate(imst.update_date),        
        })
      );

      await Promise.all(insertPromises);
      return true;
    }
 
    async insertNewOrdl() {
      const ordlRepository = this.dataSource.getRepository(Ordl);      
      await ordlRepository.clear();
      await ordlRepository.save(initialData.ordl);
    }

    private async insertnewOrdr() {
      const ordrArray = initialData.ordr;

      const insertPromises = ordrArray.map(ordr => 
        this.ordrService.create({
          ...ordr,
          cust_code: ordr.cust_code?.substring(0, 1),
          order_date: ordr.order_date ? new Date(ordr.order_date) : null,
          susp_date_time: ordr.susp_date_time ? new Date(ordr.susp_date_time) : null,
          susp_cancel_date_time: ordr.susp_cancel_date_time ? new Date(ordr.susp_cancel_date_time) : null,
          setup_date: ordr.setup_date ? new Date(ordr.setup_date) : null,
          update_date: ordr.update_date ? new Date(ordr.update_date) : null,
        })
      );


      await Promise.all(insertPromises);
      return true;
    }


    private async insertNewPrjp() {
      const prjpArray = initialData.prjp;

      const insertPromises = prjpArray.map(prjp =>
        this.prjpService.create({
          ...prjp,        
          update_date: prjp.update_date ? new Date(prjp.update_date) : null,
          price_expir_date: prjp.price_expir_date ? new Date(prjp.price_expir_date) : null,
          effect_date: prjp.effect_date ? new Date(prjp.effect_date) : null,
          content_up_price_effect_date: prjp.content_up_price_effect_date ? new Date(prjp.content_up_price_effect_date) : null,
          content_down_price_effect_date: prjp.content_down_price_effect_date ? new Date(prjp.content_down_price_effect_date) : null,
          modified_date: prjp.modified_date ? new Date(prjp.modified_date) : null,
        })
      );

      await Promise.all(insertPromises);
      return true;
    }

   private async insertNewProj() {
    const projArray = initialData.proj;

    // Helper para convertir flags 't'/'f' a boolean
    const toBoolean = (flag: string | boolean | undefined): boolean => {
      if (typeof flag === 'boolean') return flag;
      return flag === 't';
    };
    const insertPromises = projArray.map(proj => {
      const dto: CreateProjDto = {
        ...proj,

        // Convierte todas las fechas a Date        
        // setup_date: proj.setup_date ? new Date(proj.setup_date) : new Date(),
        expir_date: proj.expir_date ? new Date(proj.expir_date) : null,
        cred_chng_date: proj.cred_chng_date ? new Date(proj.cred_chng_date) : null,
        cred_card_expir_date: proj.cred_card_expir_date ? new Date(proj.cred_card_expir_date) : null,
        dataout_date: proj.dataout_date ? new Date(proj.dataout_date) : null,
        inactive_date: proj.inactive_date ? new Date(proj.inactive_date) : null,
        update_date: proj.update_date ? new Date(proj.update_date) : null,

        // Convierte todos los flags de 't'/'f' a boolean
      ca_apply_min_haul_flag: proj.ca_apply_min_haul_flag,
      cb_apply_min_haul_flag: proj.cb_apply_min_haul_flag,
      cc_apply_min_haul_flag: proj.cc_apply_min_haul_flag,
      cd_apply_min_haul_flag: proj.cd_apply_min_haul_flag,
        // Repite para todos los demás flags booleanos...
      };

      return this.projService.create(dto);
    });

    await Promise.all(insertPromises);
    return true;
  }

  private async insertNewSchl() {
    const schlArray = initialData.schl;

    // Helper para convertir flags 't'/'f' → boolean
    const toBoolean = (flag: string | boolean | undefined | null): boolean | null => {
      if (flag === undefined || flag === null) return null;
      if (typeof flag === "boolean") return flag;
      return flag === "t";
    };

    const insertPromises = schlArray.map(schl => {
      const dto: CreateSchlDto = {
        ...schl,

        // PRIMARY KEY
        order_date: new Date(schl.order_date),
        order_code: schl.order_code,
        order_intrnl_line_num: schl.order_intrnl_line_num,
        sched_num: schl.sched_num,
        unique_num: schl.unique_num,

        // COLUMNS FECHA
        on_job_time: schl.on_job_time ? new Date(schl.on_job_time) : null,
        orig_on_job_time: schl.orig_on_job_time ? new Date(schl.orig_on_job_time) : null,
        travel_time_update: schl.travel_time_update ? new Date(schl.travel_time_update) : null,
        unload_time_update: schl.unload_time_update ? new Date(schl.unload_time_update) : null,
        pump_end_pouring_time: schl.pump_end_pouring_time ? new Date(schl.pump_end_pouring_time) : null,
        on_job_time_design_value: schl.on_job_time_design_value ? new Date(schl.on_job_time_design_value) : null,
        journey_date: schl.journey_date ? new Date(schl.journey_date) : null,
        update_date: schl.update_date ? new Date(schl.update_date) : null,

        // FLAGS (bit)
        fixed_time_flag: toBoolean(schl.fixed_time_flag),
        fixed_qty_flag: toBoolean(schl.fixed_qty_flag),
        orig_on_job_time_agree_flag: toBoolean(schl.orig_on_job_time_agree_flag),
        cleanup_flag: toBoolean(schl.cleanup_flag),
        fixed_spacing_flag: toBoolean(schl.fixed_spacing_flag),
        fixed_to_plant_flag: toBoolean(schl.fixed_to_plant_flag),
        from_pump_schedule_flag: toBoolean(schl.from_pump_schedule_flag),
      };

      return this.schlService.create(dto);
    });

    await Promise.all(insertPromises);
    return true;
  }

    private async insertNewTick() {
    const tickArray = (initialData as any).tick as any[] || [];

    if (!tickArray.length) return true;

    // Helpers locales
    const toBoolean = (v: any): boolean | null => {
      if (v === null || v === undefined || v === '') return null;
      if (typeof v === 'boolean') return v;
      if (v === 1 || v === '1' || v === 't' || v === 'T' || v === 'true') return true;
      if (v === 0 || v === '0' || v === 'f' || v === 'F' || v === 'false') return false;
      return null;
    };

    const toNumber = (v: any): number | null => {
      if (v === null || v === undefined || v === '') return null;
      const n = Number(v);
      return isNaN(n) ? null : n;
    };

    const toDate = (v: any): Date | null => {
      if (!v) return null;
      if (v instanceof Date) return v;
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    };

    // Define campos por tipo que necesitamos convertir
    const dateFields = [
      'order_date','tkt_date','invc_date','sched_load_time','susp_date_time',
      'susp_cancel_date_time','typed_time','load_time','leave_plant_time',
      'arrive_job_time','start_pour_time','finish_pour_time','leave_job_time',
      'return_plant_time','stat_date_time','batch_date','ticket_printed_date_time',
      'add_water_date_time','gps_date_time','void_date_time','ticket_printed_date_time',
      'batch_date'
    ];

    const booleanFields = [
      'apply_min_load_chrg_flag','apply_zone_chrg_flag','apply_excess_unld_chrg_flag',
      'apply_season_chrg_flag','apply_min_haul_flag','rm_print_mix_wgts_flag',
      'intfc_flag','invc_flag','rm_mix_flag','pump_flag','rm_added_at_plant_flag',
      'rm_added_at_job_flag','manual_flag','add_water_flag','void_flag',
      'ready_flag','flagged_for_review_flag'
    ];

    const numberFields = [
      'rm_water_added_on_job','cod_amt','cod_order_amt','cod_prev_order_amt','cod_cash_recvd_amt',
      'disc_amt','disc_tax_amt','invc_seq_num','load_num','rm_mix_order_intrnl_line_num',
      'sched_num','qty','qty_load','qty_sand','qty_stone','qty_cement','qty_water',
      'amt','tax_amt','ticket_seq_num','pump_time_min','delv_dist','fuel_surcharge_amt',
      'energy_surcharge_amt','truck_time_min','job_wait_time_min','plant_wait_time_min',
      'haul_dist','haul_amt','rm_additive_qty','rm_additive_amt','slump','batch_num',
      'zone_delv_dist','add_water_qty','add_water_mixer_rev','addtl_qty'
    ];
    
    const insertPromises = tickArray.map(raw => {      
      const item: any = { ...raw };      
      dateFields.forEach(f => {
        if (f in item) item[f] = toDate(item[f]);
      });
      
      booleanFields.forEach(f => {
        if (f in item) item[f] = toBoolean(item[f]);
      });
      
      numberFields.forEach(f => {
        if (f in item) item[f] = toNumber(item[f]);
      });

      const stringFields = Object.keys(item).filter(k => item[k] !== null && typeof item[k] !== 'object' && typeof item[k] !== 'boolean' && !numberFields.includes(k) && !dateFields.includes(k));
      stringFields.forEach(f => {
        if (item[f] !== null && item[f] !== undefined && typeof item[f] !== 'string') {
          item[f] = String(item[f]);
        }
      });

      if (this.tickService && this.tickService.create) {
        return this.tickService.create(item);
      } else {
        const repo = this.dataSource.getRepository(Tick);
        return repo.save(item);
      }
    });

    await Promise.all(insertPromises);
    return true;
  }

}
// --- helpers dentro del mismo archivo ---

function cleanBoolean(value: any): boolean | null {
  if (value === null || value === undefined || value === '') return null;
  if (value === 1 || value === '1') return true;
  if (value === 0 || value === '0') return false;
  return null;
}

function cleanNumber(value: any): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return isNaN(n) ? null : n;
}

function cleanDate(value: any): Date | null {
  if (!value || value === 'NULL' || value === '' || value === ' ') return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}