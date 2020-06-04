import express from 'express';
import bodyParser from 'body-parser';
import { InventoryRouter } from '../../src/router/Inventory-router';
import * as InventoryService from '../../src/services/Inventory-service';
import request from 'supertest';

// Mock of Inventory service
jest.mock('../../src/services/Inventory-service');
const mockInventoryService = InventoryService as any;

// Server/Middlewear
const app = express();
app.use(bodyParser.json())
app.use('/Inventory', InventoryRouter);

describe('GET /Inventory', () => {test('Returns expected results', async () => {
        mockInventoryService.GetInventory.mockImplementation(async () => []);
        await request(app)            
        .get('/Inventory')
      // Expect 200
         .expect(200)
      .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns expected results', async () => {
        mockInventoryService.GetInventory.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/Inventory')
            .expect(500);
    });
});


describe('POST /Inventory', () => {
    test('201 Successful make', async () => {
        mockInventoryService.addItem.mockImplementation(async () => ({}));
        const payload = {
            itemname: "Game",
            ammount: 1,
            price: 10
            
        };

        await request(app)
            .post('/Inventory')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Error 500', async () => {
        mockInventoryService.addItem.mockImplementation(async () => {throw new Error()});

        const payload = {
            itemname: "Game",
            ammount: 1,
            price: 10
            
        };

        await request(app)
            .post('/Inventory')
            .send(payload)
            .expect(500);
    });
});

describe('POST /Inventory/itemid', () => {test('Returns expected results', async () => {
    mockInventoryService.removeItem.mockImplementation(async () => []);
    await request(app).post('/Inventory/1')
  // Expect 200
     .expect(200)
  .expect('content-type', 'application/json; charset=utf-8');
});
test('No object found (404)', async() => {
    mockInventoryService.removeItem.mockImplementation(async () => (0));
    await request(app)
        .get('/Inventory/text')
        .expect(404);
});

test('500 internal server error', async() => {
    mockInventoryService.removeItem.mockImplementation(async () => {throw new Error()});
    await request(app)
        .post('/Inventory/100')
        .expect(500)
})
});


