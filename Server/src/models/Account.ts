export class Account {

Name: string;
accid: number;
Password: string;
Address: string;
card: number;


// Structure of account

static from(obj: AccountRow): Account {
    const account = new Account(obj.Name, obj.accid, obj.Password, obj.Address, obj.card);
    return account;
}

constructor(Name: string, accid: number, Password: string, Address: string, card: number) {
    this.Name = Name;
    this.accid = accid;
    this.Password = Password;
    this.Address = Address;
    this.card = card;
}


}


export interface AccountRow {

    Name: string;
    accid: number;
    Password: string;
    Address: string;
    card: number;


}