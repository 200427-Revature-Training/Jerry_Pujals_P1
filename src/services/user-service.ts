import { User } from '../models/User';
import * as userDao from '../daos/user-dao';

export function getAllUsers(): Promise<User[]> {
    // Apply internal business logic
    return userDao.getAllUsers();
}

export function login(user: User): Promise<User[]>  {
   //console.log('service user log: ' + user);
    return userDao.login(user);
}

export function getUserById(id: number): Promise<User> {
    // Apply internal business logic
    return userDao.getUserById(id);
}