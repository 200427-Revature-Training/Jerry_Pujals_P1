import * as accountService from '../../src/services/Account-service';
import * as accountDao from '../../src/daos/Account-dao';
import { Account } from '../../src/models/Account';



jest.mock('../../src/daos/account-dao');
const mockAccountDao = accountDao as any;

describe('makeAccount', () => {
    test('422 returned if no Name provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockAccountDao.makeAccount.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {            
            Password: "Pass",
            Address: "9876 NE 567 PL",
            card: 8765432190
            
        }

        try {
            
            await accountService.makeAccount(payload);
            fail('AccountSerivce.makeAccount did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no Password provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockAccountDao.makeAccount.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            Name: "Gorge",
            Address: "9876 NE 567 PL",
            card: 8765432190
            
        }

        try {
            
            await accountService.makeAccount(payload);
            fail('AccountSerivce.makeAccount did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no Address provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockAccountDao.makeAccount.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            Name: "Gorge",
            Password: "Pass",
            card: 8765432190
            
        }

        try {
            
            await accountService.makeAccount(payload);
            fail('AccountSerivce.makeAccount did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no Card provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockAccountDao.makeAccount.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            Name: "Gorge",
            Password: "Pass",
            Address: "9876 NE 567 PL"
            
        }

        try {
            
            await accountService.makeAccount(payload);
            fail('AccountSerivce.makeAccount did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });






});