import * as ticketDao from '../daos/ticket-dao';
import { Ticket } from '../models/Ticket';

export function getAllTickets(): Promise<Ticket[]> {
    // Apply internal business logic
    return ticketDao.getAllTickets();
   



}

export function filter(status: string): Promise<Ticket[]>  {

    return ticketDao.filter(status);
}

export function setStatus(upTicket: Ticket): Promise<Ticket> {

    // We don't want to create Date(undefined) so check if input.birthdate
    // is defined, otherwise just pass undefined along

    if(upTicket.reimbStatus == 'Pending'){
        upTicket.reimbStatus = 1;
    }
    else if(upTicket.reimbStatus == 'Approved'){
        upTicket.reimbStatus = 2;
    }
    else if(upTicket.reimbStatus == 'Denied'){
        upTicket.reimbStatus = 3;
    }
    else{
        throw new Error('400');
    }

    

    return ticketDao.setStatus(upTicket);
}