import sql from 'mssql';

export default abstract class DBBase {
    protected readonly __pool: sql.ConnectionPool;
    constructor(readonly pool: sql.ConnectionPool) {
        this.__pool = pool;
    }
    protected abstract executeAsync(cmd: any): Promise<any>;
}
