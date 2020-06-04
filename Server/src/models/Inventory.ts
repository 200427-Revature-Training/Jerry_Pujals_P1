export class Inventory {

    itemid: number;
    itemname: string;
    ammount: number;
    price: number;
    
    
    
    // Structure of Inventory
    
    static from(obj: InventoryRow): Inventory {
        const inventory = new Inventory(obj.itemid, obj.itemname, obj.ammount, obj.price);
        return inventory;
    }
    
    constructor(itemid: number, itemname: string, ammount: number, price: number) {
        this.itemid = itemid;
        this.itemname = itemname;
        this.ammount = ammount;
        this.price = price;
    }
    
    
    }
    
    
    export interface InventoryRow {
    
        itemid: number;
        itemname: string;
        ammount: number;
        price: number;
    
    
    
    }