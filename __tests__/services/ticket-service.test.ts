import * as ticketService from '../../src/services/ticket-service';
import * as ticketDao from '../../src/daos/ticket-dao';
import { Ticket } from '../../src/models/Ticket';

/*
    Black-box testing vs White-box testing

    Black-box testing tests ONLY input-output of the function.
    White-box testing tests the known internal behavior of the function.
*/

/*
    Mocks the imported module
    The mocked module will allow us to
    stub methods - essentially replacing the
    original behavior with explicitly provided
    behavior such that our tests will not
    test the original behavior of this dependency
*/
jest.mock('../../src/daos/ticket-dao');

const mockTicketDao = ticketDao as any;

describe('newTicket', () => {
    test('422 returned if no ticket provided', async () => {
        // ticketDao.newTicket will return undefined rather than execute
        expect.assertions(1);
        mockTicketDao.newTicket.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
                reimbAmount: 100,            
                reimbSubmitted: new Date(),
                reimbDescription: 'This is a Test',
                reimbAuthor: 1,            
                reimbStatus: 1,
                reimbType: 1
            
        }

        try {
            await ticketService.newTicket(payload);
            fail('ticketService.newTicket did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('Input object transformed to ticket', async () => {
        mockTicketDao.newTicket.mockImplementation(o => o);

        const payload = {
            reimbAmount: 100,            
            reimbSubmitted: new Date(),
            reimbDescription: 'This is a Test',
            reimbAuthor: 1,            
            reimbStatus: 1,
            reimbType: 1
        
    }

        const result = await ticketService.newTicket(payload);

        expect(payload).not.toBeInstanceOf(Ticket);
        expect(result).toBeInstanceOf(Ticket);
    });

    test('ID value of input is replaced in output', async () => {
        mockTicketDao.newTicket.mockImplementation(o => o);

        const payload = {
            reimbId: 1,
            reimbAmount: 100,            
            reimbSubmitted: new Date(),
            reimbDescription: 'This is a Test',
            reimbAuthor: 1,            
            reimbStatus: 1,
            reimbType: 1
        
    }

        const result = await ticketService.newTicket(payload);

        expect(result[0].reimbId).not.toBe(payload.reimbId);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockTicketDao.newTicket.mockImplementation(o => o);

        const payload = {
            reimbAmount: 100,            
            reimbSubmitted: new Date(),
            reimbDescription: 'This is a Test',
            reimbAuthor: 1,            
            reimbStatus: 1,
            reimbType: 1
        
    }

        const result = await ticketService.newTicket(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});


describe('setStatus', () => {
  

    test('successful patch', async () => {
        expect.assertions(1);

        mockTicketDao.setStatus
            .mockImplementation(() => ({}));

            const payload = {
                reimbAmount: 100,            
                reimbSubmitted: new Date(),
                reimbDescription: 'This is a Test',
                reimbAuthor: 1,            
                reimbStatus: 1,
                reimbType: 1
            
        }

        const result = await ticketService.setStatus(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid ticket is provided', async () => {
        expect.assertions(1);

        mockTicketDao.setStatus
            .mockImplementation(() => ({}));

            const payload = {
                reimbAmount: 100,            
                reimbSubmitted: new Date(),
                reimbDescription: 'This is a Test',
                reimbAuthor: 1,            
                reimbStatus: 1,
                reimbType: 1
            
        }

        try {
            await ticketService.setStatus(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});