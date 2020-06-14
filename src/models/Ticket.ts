import { User } from '../models/User';


export class Ticket {
    reimbId?: number;
    reimbAmount: number;
    reimbSubmitted: Date | string;
    reimbResolved?: Date | string;
    reimbDescription: string;
    //Note the security risk of returning users
    reimbAuthor: User | string | number;
    reimbResolver?: User | string | number;
    reimbStatus: string | number;
    reimbType: string | number;



    static from(obj: TicketRow): Ticket {
        const ticket = new Ticket(
            obj.reim_id, obj.reim_amount, obj.reim_submitted, obj.reim_resolved, obj.reim_desc, obj.reim_author, obj.reim_resolver,
            obj.reim_status_id, obj.reim_type_id
        );
        return ticket;
    }

    constructor(reimbId: number, reimbAmount: number, reimbSubmitted: Date | string, reimbResolved: Date | string, reimbDescription: string, 
        reimbAuthor: User | string | number, reimbResolver: User | string | number,reimbStatus: string | number,reimbType: string | number) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.reimbSubmitted = reimbSubmitted;
        this.reimbResolved = reimbResolved;
        this.reimbDescription = reimbDescription;
        this.reimbAuthor = reimbAuthor;
        this.reimbResolver = reimbResolver;
        this.reimbStatus = reimbStatus;
        this.reimbType = reimbType;

    }


}

export interface TicketRow {
    reim_id?: number;
    reim_amount: number;
    reim_submitted: Date | string;
    reim_resolved?: Date | string;
    reim_desc: string;
    reim_author:  User | string | number;
    reim_resolver?:  User | string | number;
    reim_status_id: string | number;
    reim_type_id: string | number;

}

