/* istanbul ignore file */

import { database } from '../daos/database';
import { Account, AccountRow } from '../models/Account';


// SQL functions


export function adminGetAccounts(): Promise<Account[]> {
    const sql = 'SELECT * FROM accountinfo';

       return database.query<AccountRow>(sql, []).then(result => {
     const rows: AccountRow[] = result.rows;

        console.log(rows);

        
        const  accounts: Account[] = rows.map(row => Account.from(row));
        return accounts;
    });
}

export function adminGetAccountById(id: number): Promise<Account> {
    const sql = 'SELECT * FROM accountinfo WHERE accid = $1';

    return database.query<AccountRow>(sql, [id])
        .then(result => result.rows.map(row => Account.from(row))[0]);
}

export function makeAccount(account: Account): Promise<Account> {
    console.log(account);
    const sql = `INSERT INTO accountinfo ("Name" ,"Password","Address","card") \
VALUES ($1, $2, $3, $4) RETURNING *`;

    return database.query<AccountRow>(sql, [
        account.Name,
        account.Password,
        account.Address,
        account.card
    ]).then(result => result.rows.map(row => Account.from(row))[0]);
}