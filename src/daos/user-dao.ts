import { db } from '../daos/db';
import { User, UserRow } from '../models/User';
/**
 * If we are using a one-off query for, we can just use db.query - it will have a connection
 * issue the query without having to pull it from the pool.
 *
 * query(sql, [params, ...]);
 */

export function getAllUsers(): Promise<User[]> {
    const sql = 'SELECT * FROM users ORDER BY ers_user_id';

    // 1. Query database using sql statement above
    // 2. Query will return a promise typed as QueryResult<PersonRow>
    // 3. We can react to the database response by chaining a .then onto the query
    return db.query<UserRow>(sql, []).then(result => {
        // 4. Extract rows from the query response
        const rows: UserRow[] = result.rows;

        console.log(rows);

        // 5. Convert row data format to Person objects
        const user: User[] = rows.map(row => User.from(row));
        return user;
    }).catch(err => {
        console.log(err);
        return undefined;
    });
    
}


//
export function login(user: User): Promise<User[]> {
   
    const sql = 'SELECT * FROM users WHERE ers_username = $1  AND ers_password = $2'; 

    return db.query<UserRow>(sql, [user.userName, user.password])
        .then(result => {
            // 4. Extract rows from the query response
            const rows: UserRow[] = result.rows;
    
            console.log(rows);
    
            // 5. Convert row data format to Person objects
            const user: User[] = rows.map(row => User.from(row));
            return user;
        }).catch(err => {
            console.log(err);
            return undefined;
        });

}


