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
export const getResolver = async (user: number) => {

    const response = await internalAxios.post<User[]>('/user/id', user);
    console.log(response);
    return response.data.map(user => {
        return user;
    });
    //return response.data.user;//Possible issue on return type
}