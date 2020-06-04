/* istanbul ignore file */

import { database } from '../daos/database';
import { Shipment, ShipmentRow } from '../models/Shipment';
import * as InventoryDao from '../daos/inventory-dao';
import { Inventory, InventoryRow } from '../models/Inventory';

// SQL functions

// Returns Shipments
export function adminGetShipments(): Promise<Shipment[]> {
    const sql = 'SELECT * FROM orders';

       return database.query<ShipmentRow>(sql, []).then(result => {
     const rows: ShipmentRow[] = result.rows;

        console.log(rows);

        
        const  shipments: Shipment[] = rows.map(row => Shipment.from(row));
        return shipments;
    });
}


// Makes a shipment
export function addOrder(shipment: Shipment): Promise<Shipment> {
    
    const sql = `INSERT INTO orders (destination,account,itemnum,quant,total_pay) \
VALUES ($1, $2, $3, $4, $5) RETURNING *`;



    const result = database.query<ShipmentRow>(sql, [
        shipment.destination ,
        shipment.account,
        shipment.itemnum,
        shipment.quant,
        shipment.total_pay
        
    ]).then(result => result.rows.map(row => Shipment.from(row))[0]);


const sql2 = 'update inventory set ammount = ammount-$2 where itemid = $1 ;';
     database.query<InventoryRow>(sql2, [shipment.itemnum,shipment.quant])
        .then(result => result.rows.map(row => Inventory.from(row))[0]);
    

    return result;
}


// Removes a shipment
export function deleteOrder(ordernum: number): Promise<Shipment> {    
   
    const sql = 'DELETE FROM public.orders WHERE ordernum= $1';
    return database.query<ShipmentRow>(sql, [ordernum])
        .then(result => result.rows.map(row => Shipment.from(row))[0]);
}