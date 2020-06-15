import { db } from '../daos/db';
import { User, UserRow } from '../models/User';
/**
 * If we are using a one-off query for, we can just use db.query - it will have a connection
 * issue the query without having to pull it from the pool.
 *
 * query(sql, [params, ...]);
 */




//
export function login(user: User): Promise<User[]> {
   //Select row based off of username and password then return a array with that row
    const sql = 'SELECT * FROM users WHERE ers_username = $1  AND ers_password = $2'; 

    return db.query<UserRow>(sql, [user.userName, user.password])
        .then(result => {
            const rows: UserRow[] = result.rows;    
            console.log(rows);
            const user: User[] = rows.map(row => User.from(row));
            return user;
        }).catch(err => {
            console.log(err);
            return undefined;
        });

}

export function getUserById(id: number): Promise<User> {

    const sql = 'SELECT * FROM users WHERE ers_user_id = $1';

    return db.query<UserRow>(sql, [id])
        .then(result => result.rows.map(row => User.from(row))[0]);
}
