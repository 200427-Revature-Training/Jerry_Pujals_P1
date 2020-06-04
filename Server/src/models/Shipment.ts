export class Shipment {

    ordernum: number;
    destination: string;
    account: number;
    itemnum: number;
    quant: number;
    total_pay;
    
    
    
    // Structure of shipments
    
    static from(obj: ShipmentRow): Shipment {
        const shipment = new Shipment(obj.ordernum,  obj.destination,obj.account, obj.itemnum, obj.quant, obj.total_pay);
        return shipment;
    }
    
    constructor(ordernum: number, destination: string, account:number, itemnum: number, quant: number, total_pay: number) {
        this.ordernum = ordernum;
        this.destination = destination;
        this.account = account;
        this.itemnum = itemnum;
        this.quant = quant;
        this.total_pay = total_pay;
    }
    
    
    }
    
    
    export interface ShipmentRow {
    
        ordernum: number;
        destination: string;
        account: number;
        itemnum: number;
        quant: number;
        total_pay: number;
    
    
    
    }