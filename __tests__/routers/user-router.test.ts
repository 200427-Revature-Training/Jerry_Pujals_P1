import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from '../../src/routers/user-router';
import * as userService from '../../src/services/user-service';
import request from 'supertest';

// Setup mock for peopleService dependency
jest.mock('../../src/services/user-service');
const mockUserService = userService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/user', userRouter);



describe('POST /user/id', () => {
    test('Successful creation should return 201 status', async () => {
        mockUserService.getUserById.mockImplementation(async () => ({}));
        const payload = {
            id: 1
        };

        await request(app)
            .post('/user')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockUserService.getUserById.mockImplementation(async () => { throw new Error() });

        const payload = {
            id: 1
        };

        await request(app)
            .post('/user')
            .send(payload)
            .expect(500);
    });
});

describe('POST /user/login', () => {
    test('Successful creation should return 201 status', async () => {
        mockUserService.login.mockImplementation(async () => ({}));
        const payload = {
            id: 0,
            userName: 'Dude1911',
            password: '12345',
            firstName: '',
            lastName: '',
            email: '',
            roleId: 0
        };

        await request(app)
            .post('/user')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockUserService.login.mockImplementation(async () => { throw new Error() });

        const payload = {
            id: 0,
            userName: 'Dude1911',
            password: '12345',
            firstName: '',
            lastName: '',
            email: '',
            roleId: 0
        };

        await request(app)
            .post('/user')
            .send(payload)
            .expect(500);
    });
});
