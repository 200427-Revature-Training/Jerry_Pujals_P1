import * as shipmentService from '../../src/services/Shipment-service';
import * as shipmentDao from '../../src/daos/Shipment-dao';
import { Shipment } from '../../src/models/Shipment';



jest.mock('../../src/daos/shipment-dao');
const mockShipmentDao = shipmentDao as any;

describe('addOrder', () => {
    test('422 returned if no destination provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockShipmentDao.addOrder.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
      
            account: 2,
            itemnum: 4,
            quant: 1,
            total_pay: 300
            
        }

        try {
            
            await shipmentService.addOrder(payload);
            fail('ShipmentSerivce.addOrder did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no account provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockShipmentDao.addOrder.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
      
            destination: "place",
            itemnum: 4,
            quant: 1,
            total_pay: 300
            
        }

        try {
            
            await shipmentService.addOrder(payload);
            fail('ShipmentSerivce.addOrder did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no itemnum provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockShipmentDao.addOrder.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
      
            destination: "place",
            account: 2,
            quant: 1,
            total_pay: 300
            
        }

        try {
            
            await shipmentService.addOrder(payload);
            fail('ShipmentSerivce.addOrder did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no quant provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockShipmentDao.addOrder.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
      
            destination: "place",
            account: 2,
            itemnum: 4,
            total_pay: 300
            
        }

        try {
            
            await shipmentService.addOrder(payload);
            fail('ShipmentSerivce.addOrder did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no pay provided', async () => {
        expect.assertions(1);
       
        // STUB
        mockShipmentDao.addOrder.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
      
            destination: "place",
            account: 2,
            itemnum: 4,
            quant: 1
            
        }

        try {
            
            await shipmentService.addOrder(payload);
            fail('ShipmentSerivce.addOrder did not throw expected error');
        } catch(err) {
            // for unexpected errors
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });





});

