import * as inventoryService from '../../src/services/Inventory-service';
import * as inventoryDao from '../../src/daos/Inventory-dao';
import { Inventory } from '../../src/models/Inventory';



jest.mock('../../src/daos/inventory-dao');
const mockInventoryDao = inventoryDao as any;

describe('addItem', () => {
    test('422 returned if no Name provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockInventoryDao.addItem.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
             ammount: 1,
            price: 10
            
        }

        try {
            
            await inventoryService.addItem(payload);
            fail('InventorySerivce.addItem did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no ammount provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockInventoryDao.addItem.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            itemname: "Game",
            price: 10
            
        }

        try {
            
            await inventoryService.addItem(payload);
            fail('InventorySerivce.addItem did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no price provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockInventoryDao.addItem.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            itemname: "Game",
            ammount: 1
            
        }

        try {
            
            await inventoryService.addItem(payload);
            fail('InventorySerivce.addItem did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });





});

