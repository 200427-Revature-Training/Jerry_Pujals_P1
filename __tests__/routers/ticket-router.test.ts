import express from 'express';
import bodyParser from 'body-parser';
import { ticketRouter } from '../../src/routers/ticket-router';
import * as ticketService from '../../src/services/ticket-service';
import request from 'supertest';
import { Ticket } from '../../src/models/Ticket';


// Setup mock for ticketService dependency
jest.mock('../../src/services/ticket-service');
const mockTicketService = ticketService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/ticket', ticketRouter);

describe('GET /ticket', () => {
    test('Returns normally under normal circumstances', async () => {
        mockTicketService.getAllTickets.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/ticket')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockTicketService.getAllTickets.mockImplementation(async () => { throw new Error() });
        await request(app)
            .get('/ticket')
            .expect(500);
    });
});

describe('POST /ticket/id', () => {
    test('Successful creation  return 201 status', async () => {
        mockTicketService.getById.mockImplementation(async () => ({}));
        const payload = {
            id: 1
        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Return 500 encountering an error', async () => {
        mockTicketService.getById.mockImplementation(async () => { throw new Error() });

        const payload = {
            id: 1
        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(500);
    });
});

describe('POST /ticket/newTicket', () => {
    const t: Ticket ={
        reimbAmount: 100,            
        reimbSubmitted: new Date(),
        reimbDescription: 'This is a Test',
        reimbAuthor: 1,            
        reimbStatus: 1,
        reimbType: 1
    };
    test('Successful creation  return 201 status', async () => {
        mockTicketService.newTicket.mockImplementation(async () => ({}));
        const payload = {
            t

        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Return 500 encountering an error', async () => {
         mockTicketService.newTicket.mockImplementation(async () => { throw new Error() });

        const payload = { 
           t
        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(500);
    });
});

describe('POST /ticket/filter', () => {
    test('Successful creation  return 201 status', async () => {
        mockTicketService.filter.mockImplementation(async () => ({}));
        const payload = {
            status: 'Pending'
        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Return 500 encountering an error', async () => {
        mockTicketService.filter.mockImplementation(async () => { throw new Error() });

        const payload = {
            status: 'Pending'
        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(500);
    });
});

describe('POST /ticket/setStatus', () => {
    const t: Ticket ={
        reimbId: 1,
        reimbAmount: 100, 
        reimbResolved: new Date(),           
        reimbSubmitted: new Date(),
        reimbDescription: 'This is a Test',
        reimbAuthor: 1,  
        reimbResolver:  2,          
        reimbStatus: 2,
        reimbType: 1
    };

    test('Successful creation  return 201 status', async () => {
        mockTicketService.setStatus.mockImplementation(async () => ({}));
        const payload = {
            t

        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Return 500 encountering an error', async () => {
         mockTicketService.setStatus.mockImplementation(async () => { throw new Error() });

        const payload = { 
           t
        };

        await request(app)
            .post('/ticket')
            .send(payload)
            .expect(500);
    });
});

