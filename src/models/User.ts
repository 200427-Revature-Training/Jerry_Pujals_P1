export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;

    
    static from(obj: UserRow): User {
        const user = new User(
            obj.id, obj.userName, obj.password, obj.firstName, obj.lastName, obj.email
        );
        return user;
    }

    constructor(id: number, userName: string, password: string, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

   
}

export interface UserRow {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}
