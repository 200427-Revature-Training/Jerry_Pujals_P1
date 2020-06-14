import { User } from '../models/User';


export interface Ticket {
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
}
