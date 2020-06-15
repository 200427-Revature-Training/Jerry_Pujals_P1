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

   
});