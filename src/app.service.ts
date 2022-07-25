import SampleDal  from './data/sample.dal';
import sql  from 'mssql';
import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(private readonly configService: ConfigService,private readonly dal: SampleDal) {
    console.log('new object')
  }
  async getHello() {
    let result =this.dal.getMunicipalitiesAsync();
    
    return result;
  }
}
