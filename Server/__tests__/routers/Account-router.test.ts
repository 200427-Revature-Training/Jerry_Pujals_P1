import express from 'express';
import bodyParser from 'body-parser';
import { AccountRouter } from '../../src/router/Account-router';
import * as AccountService from '../../src/services/Account-service';
import request from 'supertest';

// Mock of account service
jest.mock('../../src/services/Account-service');
const mockAccountService = AccountService as any;

// Server/Middlewear
const app = express();
app.use(bodyParser.json())
app.use('/Admin_Accounts', AccountRouter);

describe('GET /Admin_Accounts', () => {test('Returns expected results', async () => {
        mockAccountService.adminGetAccounts.mockImplementation(async () => []);
        await request(app)            
        .get('/Admin_Accounts')
      // Expect 200
         .expect(200)
      .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns expected results', async () => {
        mockAccountService.adminGetAccounts.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/Admin_Accounts')
            .expect(500);
    });
});


describe('GET /Admin_Accounts/id', () => {test('Returns expected results', async () => {
    mockAccountService.adminGetAccountById.mockImplementation(async () => []);
    await request(app)            
    .get('/Admin_Accounts/1')
  // Expect 200
     .expect(200)
  .expect('content-type', 'application/json; charset=utf-8');
});
test('No object found (404)', async() => {
    mockAccountService.adminGetAccountById.mockImplementation(async () => (0));
    await request(app)
        .get('/Admin_Accounts/text')
        .expect(404);
});

test('500 internal server error', async() => {
    mockAccountService.adminGetAccountById.mockImplementation(async () => {throw new Error()});
    await request(app)
        .get('/Admin_Accounts/100')
        .expect(500)
})
});


describe('POST /Admin_Accounts', () => {
    test('201 Successful make', async () => {
        mockAccountService.makeAccount.mockImplementation(async () => ({}));
        const payload = {
            Name: "Gorge",
            Password: "Pass",
            Address: "9876 NE 567 PL",
            card: 8765432190
            
        };

        await request(app)
            .post('/Admin_Accounts')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Error 500', async () => {
        mockAccountService.makeAccount.mockImplementation(async () => {throw new Error()});

        const payload = {
            Name: "Gorge",
            Password: "Pass",
            Address: "9876 NE 567 PL",
            card: 8765432190
            
        };

        await request(app)
            .post('/Admin_Accounts')
            .send(payload)
            .expect(500);
    });
});