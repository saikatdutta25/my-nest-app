import sql from 'mssql';


export default class SqlParam {

    private _key: string;
    private _value: any;
    private _dbtype: sql.ISqlType | (() => sql.ISqlType);
    private _isOutput: boolean = false;
    public get key(): string {
        return this._key;
    }
    public set key(v: string) {
        this._key = v;
    }
    public get value(): any {
        return this._value;
    }
    public set value(v: any) {
        this._value = v;
    }
    public get dbtype(): sql.ISqlType | (() => sql.ISqlType) {
        return this._dbtype;
    }
    public set dbtype(v: sql.ISqlType | (() => sql.ISqlType)) {
        this._dbtype = v;
    }
    public get isOutput(): boolean {
        return this._isOutput;
    }
    public set isOutput(v: boolean) {
        this._isOutput = v;
    }
    constructor(key: string, value: any, dbtype: sql.ISqlType | (() => sql.ISqlType), isOutput: boolean = false) {
        this.value = value;
        this.dbtype = dbtype;
        this.key = key;
        this.isOutput = isOutput;
    }
}
