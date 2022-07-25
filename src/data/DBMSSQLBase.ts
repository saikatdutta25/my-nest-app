import sql from 'mssql';
import  DBTransactionBase  from "./DBTransactionBase";
import  SqlParam  from "./SqlParam";
import  SqlCommand  from "./SqlCommand";


export default class DBMSSQLBase extends DBTransactionBase {
    /**
     * help: https://tediousjs.github.io/node-mssql/#asyncawait
     */
    constructor(readonly pool: sql.ConnectionPool) {
        super(pool);
    }
    protected async executeAsync<T>(cmd: SqlCommand): Promise<sql.IProcedureResult<T>> {
        return this.buidlCommand(cmd.__params || [])
            .execute(cmd.__procName);
        // , (err, result) => {
        //     // ... error checks
        //     console.log(result.recordsets.length) // count of recordsets returned by the procedure
        //     console.log(result.recordsets[0].length) // count of rows contained in first recordset
        //     console.log(result.recordset) // first recordset from result.recordsets
        //     console.log(result.returnValue) // procedure return value
        //     console.log(result.output) // key/value collection of output values
        //     console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
        //     // ...
        // })
    }
    //#region private methods
    private buidlCommand(params: SqlParam[]): sql.Request {
     const request = this.__txn ? new sql.Request(this.__txn) : new sql.Request(this.__pool);
        //const request = this.__txn ? (await this.__pool.request(this.__txn)) : await this.__pool.request();
        params.forEach((t: SqlParam) => {
            if (t.isOutput)
                request.output(t.key, t.dbtype, t.value);

            else
                request.input(t.key, t.dbtype, t.value);
        });
        return request;
    }
}
