import { internalAxios } from './internal-axios'
import { User } from '../models/User';


export const getAllUsers = async () => {
    const response = await internalAxios.get<User[]>('/user');
    console.log(response);
    return response.data.map(user => {
        return user;
    });
}

export const login = async (logger: User) => {
    const response = await internalAxios.post('/user/login', logger);
    console.log(response);
    return response.data.user;//Possible issue on return type
}