import { Account } from '../models/Account';
import * as AccountDao from '../daos/account-dao';


// Calls sql function in daos

// Returns all accounts
export function adminGetAccounts(): Promise<Account[]> {

    return AccountDao.adminGetAccounts();


}


// Returns account based on id
export function adminGetAccountById(id: number): Promise<Account> {

    return AccountDao.adminGetAccountById(id);


}


// Add account to table
export function makeAccount(account: any): Promise<Account> {

    // Data from the user cannot be trusted
    const newAccount = new Account(account.Name, undefined, account.Password,account.Address,account.card);

    // Validate that all data is valid and not null


    if(account.Name  && account.Password && account.Address && account.card) {
       
        return AccountDao.makeAccount(newAccount);
        
    } else {
        // If not valid send error
      
        return new Promise((resolve, reject) => reject(422));
    }
}