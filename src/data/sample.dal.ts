import { Injectable, Scope } from '@nestjs/common';
import sql from 'mssql';
import DBMSSQLBase from './DBMSSQLBase';
import SqlCommand from './SqlCommand';
import SqlParam from './SqlParam';

@Injectable({scope: Scope.REQUEST})
export default class SampleDal extends DBMSSQLBase {
    /**
     *
     */
    constructor(readonly pool: sql.ConnectionPool) {
        super(pool);
    }
    async getMunicipalitiesAsync(){
       
        try{
            let cmd=new SqlCommand("taxation.Get_LocationByLocIdWardIdMnId")
            .addParam(new SqlParam("LocationID",1,sql.Int))
            .addParam(new SqlParam("WardId",1,sql.Int))
            .addParam(new SqlParam("MnId",47,sql.Int));
    
            let result =await this.executeAsync(cmd);
            return result.recordset;
        }catch(e){
            console.error(e)
        }
    }
}