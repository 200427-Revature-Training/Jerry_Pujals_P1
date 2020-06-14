import React, { useState, useEffect } from 'react';
import { db } from '../daos/db';
import { Ticket, TicketRow } from '../models/Ticket';
import { StatusRow, Status } from '../models/Status';
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

export function getStatus(ticket: Ticket): Promise<string>{
    
    const sql = 'SELECT reim_status FROM reimbursement_status WHERE reimbursement_status.reim_status_id = $1';

    return db.query<StatusRow>(sql, [ticket.reimbStatus]).then(result => {
      
        const rows: StatusRow[] = result.rows;

        const tickets: Status[] = rows.map(row => Status.from(row));
        console.log("From in getStatus: ");
        console.log(tickets[0].reim_status);

        return  tickets[0].reim_status;
    }).catch(err => {
        console.log(err);
        return undefined;
    });

}





export function  filter  ( status: string): Promise<Ticket[]> {

   // const sql = 'SELECT * FROM reimbursement inner join reimbursement_status on reimbursement.reim_status_id= reimbursement_status.reim_status_id WHERE reim_status_id = $1';
    const sql = 'SELECT * FROM reimbursement inner join reimbursement_status on reimbursement.reim_status_id= reimbursement_status.reim_status_id WHERE reimbursement_status.reim_status = $1';
    const [tickets, setTickets] = useState<Ticket[]>([]);

    return db.query<TicketRow>(sql, [status]).then(result => {
      
        const rows: TicketRow[] = result.rows;
        

       setTickets(rows.map(row => { return Ticket.from(row)}));
      //  const tickets: Ticket[] = rows.map(row => { return Ticket.from(row)});

        tickets.forEach(element  => {
            

            
            getStatus(element).then(result =>{
                console.log("From GetStatus: ");
                console.log(result);

                element.reimbStatus = result;
            });

        });
        console.log("From Tickets Array: ");
        console.log(tickets);
        return tickets;
    }).catch(err => {
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






