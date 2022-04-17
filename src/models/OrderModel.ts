export interface IOrder {
    id?: string;
    msisdn: string;
    name: string;
    trpl: number;
    status: number;
    date: string;
}

export class OrederModel implements IOrder {
    public id?: string = '';
    public msisdn: string = '';
    public name: string = '';
    public trpl: number = 0;
    public status: number = 0;
    public date: string = '';

    constructor(json: IOrder) {
        this.fromJson(json);
    }

    public fromJson(json: IOrder) {
        this.id = json.id;
        this.msisdn = json.msisdn;
        this.name = json.name;
        this.trpl = json.trpl;
        this.status = json.status;
        this.date = json.date;
    }

    public toJson(): IOrder {
        const obj: IOrder = {
            id: this.id,
            msisdn: this.msisdn,
            name: this.name,
            trpl: this.trpl,
            status: this.status,
            date: this.date,
        };

        return obj;
    }
}