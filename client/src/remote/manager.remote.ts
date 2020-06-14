import { internalAxios } from './internal-axios'
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';


export const getAllUsers = async () => {
    const response = await internalAxios.get<User[]>('/user');
    console.log(response);
    return response.data.map(user => {
        return user;
    });
}

//Returns ticket array for manager
export const getAllTickets = async () => {
    
    const response = await internalAxios.get<Ticket[]>('/ticket');
    console.log(response);
    
    return response.data.map(tickets => {
        return tickets;
    });
}

//Returns tickets with matching status string
export const filterTickets = async (status: string) => {
    console.log(status);

    const response = await internalAxios.post<Ticket[]>('/ticket/filter', {status});
    console.log(response);


    return response.data.map(tickets => {
        return tickets;
    });
    //
}

export const changeStatus = async (ticket : Ticket) => {
    const response = await internalAxios.patch<Ticket>('/ticket/setStatus', ticket);
    console.log(response);
    return response;
}
