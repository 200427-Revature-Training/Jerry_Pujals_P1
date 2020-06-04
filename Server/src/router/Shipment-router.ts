import express from 'express';
import * as ShipmentService from '../services/Shipment-service';

// Set export
export const ShipmentRouter = express.Router();

//   Get  http://localhost:3000/Admin_Shipments

ShipmentRouter.get('', (request, response, next) => {
    ShipmentService.adminGetShipments().then(shipments => {
        response.set('content-type', 'application/json');
        response.json(shipments);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
    POST http://localhost:3000/Admin_Shipments
*/
ShipmentRouter.post('', (request, response, next) => {
    const shipment = request.body;
    ShipmentService.addOrder(shipment)
        .then(newShipment => {
            
            response.status(201);
            response.json(newShipment);
            next();
        }).catch(err => {
            response.sendStatus(500);
            next();
        });
});


//  Post   http://localhost:3000/Admin_Shipments/ordernum

ShipmentRouter.post('/:ordernum', (request, response, next) => {
    const ordernum = +request.params.ordernum;
   
    ShipmentService.deleteOrder(ordernum).then(shipment => {
        if (!shipment) {
            response.sendStatus(200);
        } else {
            response.json(shipment);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
});