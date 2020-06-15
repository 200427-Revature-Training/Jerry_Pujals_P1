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
export function getById(id: number): Promise<Ticket[]> {
    const sql = 'SELECT * FROM reimbursement WHERE reim_author = $1 ORDER BY reim_id';
    return db.query<TicketRow>(sql, [id]).then(result => {

        const rows: TicketRow[] = result.rows;

        console.log(rows);
        const tickets: Ticket[] = rows.map(row => Ticket.from(row));
        return tickets;
    }).catch(err => {
        console.log(err);
        return undefined;
    });

}

export function getStatus(ticket: Ticket): Promise<string> {

    const sql = 'SELECT reim_status FROM reimbursement_status WHERE reimbursement_status.reim_status_id = $1';

    return db.query<StatusRow>(sql, [ticket.reimbStatus]).then(result => {

        const rows: StatusRow[] = result.rows;

        const tickets: Status[] = rows.map(row => Status.from(row));
        //console.log("From in getStatus: ");
        // console.log(tickets[0].reim_status);

        return tickets[0].reim_status;
    }).catch(err => {
        console.log(err);
        return undefined;
    });

}





export function filter(status: string): Promise<Ticket[]> {

    // const sql = 'SELECT * FROM reimbursement inner join reimbursement_status on reimbursement.reim_status_id= reimbursement_status.reim_status_id WHERE reim_status_id = $1';
    const sql = 'SELECT * FROM reimbursement inner join reimbursement_status on reimbursement.reim_status_id= reimbursement_status.reim_status_id WHERE reimbursement_status.reim_status = $1';

    return db.query<TicketRow>(sql, [status]).then(result => {

        const rows: TicketRow[] = result.rows;


        const tickets: Ticket[] = rows.map(row => { return Ticket.from(row) });

        let canreturn = false;;

        for (let i = 0; i < tickets.length; i++) {
            getStatus(tickets[i]).then(result => {
                console.log("From GetStatus: ");
                // console.log(result);


                tickets[i].reimbStatus = result;

                console.log("   ticket status: ");

                console.log(tickets[i].reimbStatus);
                if (i = tickets.length - 1) {
                    //  canreturn = true
                    return tickets;
                }
            });


        }





        console.log("From Tickets Array: ");
        console.log("ticket status: ");
        console.log(tickets[0].reimbStatus);
        console.log("ticket: ");

        console.log(tickets[0]);


        return tickets;

    }).catch(err => {
        console.log(err);
        return undefined;
    });
}


export function newTicket(upTicket: Ticket): Promise<Ticket[]> {


    const sql = `INSERT INTO reimbursement (reim_amount, reim_submitted, reim_desc, reim_author, reim_status_id, reim_type_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;

    if (upTicket.reimbType == 'Lodging') {
        upTicket.reimbType = 1;
    }
    else if (upTicket.reimbType == 'Travel') {
        upTicket.reimbType = 2;
    }
    else if (upTicket.reimbType == 'Food') {
        upTicket.reimbType = 3;
    }
    else if (upTicket.reimbType == 'Other') {
        upTicket.reimbType = 4;
    }
    console.log(upTicket.reimbType);
    const params = [upTicket.reimbAmount, upTicket.reimbSubmitted, upTicket.reimbDescription, upTicket.reimbAuthor, upTicket.reimbStatus, upTicket.reimbType];

    return db.query<TicketRow>(sql, params).then(result => {

        const rows: TicketRow[] = result.rows;

        console.log(rows);
        const tickets: Ticket[] = rows.map(row => Ticket.from(row));
        return tickets;
    }).catch(err => {
        console.log(err);
        return undefined;
    });
}

export function setStatus(upTicket: Ticket): Promise<Ticket[]> {

    //UPDATE reimbursement SET reim_status_id = COALESCE($1, reim_status_id) WHERE reim_id = $2 RETURNING *
    const sql = `UPDATE reimbursement
    SET reim_resolved=$1, reim_resolver=$2, reim_status_id=$3
    WHERE reim_id=$4 RETURNING *`;

    const params = [upTicket.reimbResolved, upTicket.reimbResolver, upTicket.reimbStatus, upTicket.reimbId];
    db.query<TicketRow>(sql, params).then(result => {
        const rows: TicketRow[] = result.rows;
        console.log(rows);
        const tickets: Ticket[] = rows.map(row => Ticket.from(row));
        //  return tickets;
    }).catch(err => {
        console.log(err);
        return undefined;
    });
    let num: number = 0;
    if (typeof upTicket.reimbAuthor == 'number') {
        num = upTicket.reimbAuthor;
    }

    return getById(num);


}






