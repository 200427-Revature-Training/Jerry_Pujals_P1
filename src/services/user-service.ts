import { User } from '../models/User';
import * as userDao from '../daos/user-dao';
import { Pet } from '../models/Pet';

export function getAllUsers(): Promise<User[]> {
    // Apply internal business logic
    return userDao.getAllUsers();
}