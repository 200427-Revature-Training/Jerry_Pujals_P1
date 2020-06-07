import { internalAxios } from './internal-axios'
import { User } from '../models/User';


export const getAllUsers = async () => {
    const response = await internalAxios.get<User[]>('/user');
    console.log(response);
    return response.data.map(user => {
        return user;
    });
}
