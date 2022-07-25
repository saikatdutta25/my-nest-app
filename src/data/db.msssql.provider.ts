import { Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sql, { config } from 'mssql'
const connectionPoolProvider = {
    provide: sql.ConnectionPool,
    useFactory: async (configService: ConfigService) => {
        let config: config = configService.get("default").db.mssql;
        let pool= new sql.ConnectionPool(config);
        let con= await pool.connect();
        return con;
    },
    inject: [ConfigService],
    scope:Scope.REQUEST
};
export { connectionPoolProvider };