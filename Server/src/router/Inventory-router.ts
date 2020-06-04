import express from 'express';
import * as InventoryService from '../services/Inventory-service';

// Set export
export const InventoryRouter = express.Router();

// GET    http://localhost:3000/Inventory


InventoryRouter.get('', (request, response, next) => {
    InventoryService.GetInventory().then(inventoryies => {
        response.set('content-type', 'application/json');
        response.json(inventoryies);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
    POST http://localhost:3000/Inventory
*/
InventoryRouter.post('', (request, response, next) => {
    const inventory = request.body;
    InventoryService.addItem(inventory)
        .then(newInventory => {
            
            response.status(201);
            response.json(newInventory);
            next();
        }).catch(err => {
            response.sendStatus(500);
            next();
        });
});


//  Post   http://localhost:3000/Inventory/itemid

InventoryRouter.post('/:itemid', (request, response, next) => {
    const itemid = +request.params.itemid;
    
    InventoryService.removeItem(itemid).then(inventory => {
        if (!inventory) {
            response.sendStatus(200);
        } else {
            response.json(inventory);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
});