import SqlParam  from "./SqlParam";


export default class SqlCommand {
    /**
     *
     */
    public readonly __params: SqlParam[] = [];
    public readonly __procName: string;
    constructor( readonly procName: string,  readonly params: SqlParam[] = []) {
        this.__procName = procName;
        this.__params = [...params];
    }
    addParam(param: SqlParam): SqlCommand {
        this.__params.push(param);
        return this;
    }
    removeParam(param: SqlParam | { (item: SqlParam): boolean; }): void {
        let $param: SqlParam = null;
        if (typeof (param) == "function") {
            let $param = this.__params.find(t => param(t));
            if ($param)
                this.__params.splice(this.__params.indexOf($param), 1);
        } else if ($param)
            this.__params.splice(this.__params.indexOf(param), 1);
    }
}
