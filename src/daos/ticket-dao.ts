import { db } from '../daos/db';
import { Ticket, TicketRow } from '../models/Ticket';
import { uptime } from 'process';



export function getAllTickets(): Promise<Ticket[]> {
    const sql = 'SELECT * FROM reimbursement ORDER BY reim_id';
    return db.query<TicketRow>(sql, []).then(result => {
      
        const rows: TicketRow[] = result.rows;

        console.log(rows);
        const tickets: Ticket[] = rows.map(row => Ticket.from(row));
        return tickets;
    }).catch(err => {
        console.log(err);
        return undefined;
    });
    
}


export function filter(status: string): Promise<Ticket[]> {

   // const sql = 'SELECT * FROM reimbursement inner join reimbursement_status on reimbursement.reim_status_id= reimbursement_status.reim_status_id WHERE reim_status_id = $1';
    const sql = 'SELECT * FROM reimbursement inner join reimbursement_status on reimbursement.reim_status_id= reimbursement_status.reim_status_id';

    return db.query<TicketRow>(sql, [status])
        .then(result => result.rows.map(row => Ticket.from(row))[0]).
        catch(err => {
            console.log(err);
            return undefined;
        });
}


export function setStatus(upTicket: Ticket): Promise<Ticket> {


    const sql = `UPDATE reimbursement SET reim_status_id = COALESCE($1, reim_status_id) WHERE reim_id = $2 RETURNING *`;


    const params = [upTicket.reimbStatus,upTicket.reimbId];

    return db.query<TicketRow>(sql, params)
        .then(result => result.rows.map(row => Ticket.from(row))[0]);
}


export  function getStatus(ticket: Ticket){

    
    const sql = 'SELECT * FROM reimbursement inner join reimbursement_status on reimbursement.reim_status_id= reimbursement_status.reim_status_id WHERE reim_id = $2';

    return db.query<TicketRow>(sql, [ticket.reimbStatus,ticket.reimbId])
    .then(result => result.rows.map(row => Ticket.from(row))[0]).
    catch(err => {
        console.log(err);
        return undefined;
    });
}



