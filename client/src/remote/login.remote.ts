import { internalAxios } from './internal-axios'
import { User } from '../models/User';



export const login = async (logger: User) => {
    const response = await internalAxios.post<User[]>('/user/login', logger);
    console.log(response);
    return response.data.map(user => {
        return user;
    });
    //return response.data.user;//Possible issue on return type
}

export const login2 = async (logger: User) => {
    const response = await internalAxios.post<User[]>('/user/login2', logger);
    console.log('login2' + response);
    return response.data.map(user => {
        return user;
    });
    //return response.data.user;//Possible issue on return type
}