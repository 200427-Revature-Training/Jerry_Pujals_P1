import { Inventory } from '../models/Inventory';
import * as InventoryDao from '../daos/inventory-dao';


// Calls sql function in daos

// Return inventory 
export function GetInventory(): Promise<Inventory[]> {

    return InventoryDao.GetInventory();


}

// Add item to table
export function addItem(inventory: any): Promise<Inventory> {

    // Data from the user cannot be trusted
    const newInventory = new Inventory( undefined, inventory.itemname,inventory.ammount,inventory.price);

    // Validate that all data is valid and not null


    if(inventory.itemname && inventory.ammount &&inventory.price) {
       
        return InventoryDao.addItem(newInventory);
        
    } else {
        // If not valid send error
      
        return new Promise((resolve, reject) => reject(422));
    }
}


// Removes item from inventroy by item id
export function removeItem(itemid: number): Promise<Inventory> {

    return InventoryDao.removeItem(itemid);


}