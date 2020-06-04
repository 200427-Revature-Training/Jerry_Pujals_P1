import { Shipment } from '../models/Shipment';
import * as ShipmentDao from '../daos/shipment-dao';


// Calls sql function in daos

// Returns shipment table
export function adminGetShipments(): Promise<Shipment[]> {

    return ShipmentDao.adminGetShipments();


}

// Add item to table
export function addOrder(shipment: any): Promise<Shipment> {

    // Data from the user cannot be trusted
    const newShipment = new Shipment( undefined, shipment.destination,shipment.account, shipment.itemnum, shipment.quant,shipment.total_pay);

    // Validate that all data is valid and not null


    if(shipment.destination && shipment.account && shipment.itemnum && shipment.quant && shipment.total_pay) {
       
        return ShipmentDao.addOrder(newShipment);
        
    } else {
        // If not valid send error
      
        return new Promise((resolve, reject) => reject(422));
    }
}


// Removes order from shipments by order id
export function deleteOrder(ordernum: number): Promise<Shipment> {

    return ShipmentDao.deleteOrder(ordernum);


}