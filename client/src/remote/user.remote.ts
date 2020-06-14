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


export const getAllTickets = async (id: number) => {
    
    const response = await internalAxios.post<Ticket[]>('/ticket/id', {id});
    console.log(response);
    
    return response.data.map(tickets => {
        return tickets;
    });
}



export const getResolver = async (id: number) => {



    const response = await internalAxios.post<User[]>('/user/id', {id});
    console.log(response);
    
    return response.data.map(users => {
        return users;
    });
}

export const makeNewTicket = async (ticket : Ticket) => {
    const response = await internalAxios.post<Ticket>('/ticket/newTicket', {ticket});
    console.log(response);
  //  return response;
}
