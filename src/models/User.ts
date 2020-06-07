export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;

    
    static from(obj: UserRow): User {
        const user = new User(
            obj.ers_user_id, obj.ers_username, obj.ers_password, obj.user_first_name, obj.user_last_name, obj.user_email, obj.user_role_id
        );
        return user;
    }

    constructor(id: number, userName: string, password: string, firstName: string, lastName: string, email: string, roleId: number) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roleId = roleId;
    }

   
}

export interface UserRow {
    ers_user_id: number;
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_role_id: number;
}
