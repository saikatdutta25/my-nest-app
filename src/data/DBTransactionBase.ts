import sql from 'mssql';
import DBBase  from './DBBase';

export default abstract class DBTransactionBase extends DBBase {
    /**
     *
     */
    protected __txn: sql.Transaction;
    protected __isTxnUsable: boolean;
    constructor(readonly pool: sql.ConnectionPool) {
        super(pool);
    }
    protected async commitTxnAsync() {
        if (this.__txn && this.__isTxnUsable) {
            await this.__txn.commit();
            this.__isTxnUsable = false;
            this.__txn = null;
        }
    }
    protected async beginTxnAsync() {
        if (this.__isTxnUsable)
            return;
        this.__txn = new sql.Transaction(this.pool);
        await this.__txn.begin();
        this.__isTxnUsable = true;
    }
    protected async rollbackTxnAsync() {
        if (this.__txn && this.__isTxnUsable) {
            await this.__txn.rollback();
            this.__isTxnUsable = false;
            this.__txn = null;
        }
    }
}
