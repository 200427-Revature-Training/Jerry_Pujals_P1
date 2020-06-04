import express from 'express';
import bodyParser from 'body-parser';
import { ShipmentRouter } from '../../src/router/Shipment-router';
import * as ShipmentService from '../../src/services/Shipment-service';
import request from 'supertest';

// Mock of shipment service
jest.mock('../../src/services/Shipment-service');
const mockShipmentService = ShipmentService as any;

// Server/Middlewear
const app = express();
app.use(bodyParser.json())
app.use('/Admin_Shipments', ShipmentRouter);

describe('GET /Admin_Shipments', () => {test('Returns expected results', async () => {
        mockShipmentService.adminGetShipments.mockImplementation(async () => []);
        await request(app)            
        .get('/Admin_Shipments')
      // Expect 200
         .expect(200)
      .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns expected results', async () => {
        mockShipmentService.adminGetShipments.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/Admin_Shipments')
            .expect(500);
    });
});


describe('POST /Admin_Shipments', () => {
    test('201 Successful make', async () => {
        mockShipmentService.addOrder.mockImplementation(async () => ({}));
        const payload = {
            itemname: "Game",
            ammount: 1,
            price: 10
            
        };

        await request(app)
            .post('/Admin_Shipments')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Error 500', async () => {
        mockShipmentService.addOrder.mockImplementation(async () => {throw new Error()});

        const payload = {
            itemname: "Game",
            ammount: 1,
            price: 10
            
        };

        await request(app)
            .post('/Admin_Shipments')
            .send(payload)
            .expect(500);
    });
});

describe('POST /Admin_Shipments/itemid', () => {test('Returns expected results', async () => {
    mockShipmentService.deleteOrder.mockImplementation(async () => []);
    await request(app).post('/Admin_Shipments/1')
  // Expect 200
     .expect(200)
  .expect('content-type', 'application/json; charset=utf-8');
});
test('No object found (404)', async() => {
    mockShipmentService.deleteOrder.mockImplementation(async () => (0));
    await request(app)
        .get('/Admin_Shipments/text')
        .expect(404);
});

test('500 internal server error', async() => {
    mockShipmentService.deleteOrder.mockImplementation(async () => {throw new Error()});
    await request(app)
        .post('/Admin_Shipments/100')
        .expect(500)
})
});


