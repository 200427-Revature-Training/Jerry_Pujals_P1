/* istanbul ignore file */

import { database } from '../daos/database';
import { Inventory, InventoryRow } from '../models/Inventory';


// SQL functions

// Return inventory
export function GetInventory(): Promise<Inventory[]> {
    const sql = 'SELECT * FROM inventory';

       return database.query<InventoryRow>(sql, []).then(result => {
     const rows: InventoryRow[] = result.rows;

        console.log(rows);

        
        const  inventories: Inventory[] = rows.map(row => Inventory.from(row));
        return inventories;
    });
}

// Adds to inventory
export function addItem(inventory: Inventory): Promise<Inventory> {
    
    const sql = `INSERT INTO inventory (itemname,ammount,price) \
VALUES ($1, $2, $3) RETURNING *`;

    return database.query<InventoryRow>(sql, [
        inventory.itemname,
        inventory.ammount,
        inventory.price
        
    ]).then(result => result.rows.map(row => Inventory.from(row))[0]);
}



// Removes a item from inventory
export function removeItem(itemid: number): Promise<Inventory> {    
   
    const sql = 'DELETE FROM public.inventory WHERE itemid= $1';
    return database.query<InventoryRow>(sql, [itemid])
        .then(result => result.rows.map(row => Inventory.from(row))[0]);
}

