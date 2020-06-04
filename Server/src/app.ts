import express from 'express';
import bodyParser from 'body-parser';
import { database } from './daos/database';
import { AccountRouter } from './router/Account-router';
import { ShipmentRouter } from './router/Shipment-router';
import { InventoryRouter } from './router/Inventory-router';

// Make this a constant
const app = express();
// Setting port to access
const port = process.env.port || 3000;
app.set('port', port);

// Middleware

app.use(bodyParser.json());

app.use('/Admin_Accounts', AccountRouter);
app.use('/Inventory', InventoryRouter);
app.use('/Admin_Shipments', ShipmentRouter);

// Error handelling
process.on('unhandledRejection', () => {
    database.end().then(() => {
        console.log('Database pool closed');
    });
});

// Logs
app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});

/*
Function ideas:
Accounts:
Admin get accounts
Admin get account by id
Make account
Set info (use password)

Inventory:
GetInventory
AddToInv
RemoveFromInv

Shipment:
AdminGetshipments
MakeShipment
Cancelshipment
*/