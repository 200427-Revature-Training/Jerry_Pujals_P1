import React, { useState, useEffect } from 'react';
import * as userRemote from '../remote/user.remote';
import { User } from '../models/User';
import './user.component.css';
import { Modal, Button, Form } from 'react-bootstrap';

const loggedin = false;

export const UserComponent: React.FC = () => {
    const [user, setUsers] = useState<User[]>([]);



    useEffect(() => {
        loadUser();
    }, [])

   

    const loadUser = () => {
        userRemote.getAllUsers().then(user => {
            setUsers(user);
        });        
    }

if(loggedin){
    return (
        <div>
            <header>
                <h2 
                id="user-header" className="dark">User Section                 
                </h2>
            </header>

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Password</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role ID</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {user.map(u => {
                        return (<tr key={u.id}>
                            <th scope="row">{u.id}</th>
                            <td>{u.userName}</td>
                            <td>{u.password}</td>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.email}</td>
                            <td>{u.roleId}</td>
                            
                        </tr>)
                    })}
                </tbody>
            </table>

            {/* react-bootstrap components */}
           

           
        </div>
    );
                }
    else{
        return (
            <div>
                <header>
                    <h2 
                    id="user-header" className="dark">Login                 
                    </h2>
                </header>
    
                {/* react-bootstrap components */}
               
    
               
            </div>
        );
    }


}