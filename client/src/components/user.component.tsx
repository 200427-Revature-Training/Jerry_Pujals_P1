import React, { useState, useEffect } from 'react';
import * as userRemote from '../remote/user.remote';
import { User } from '../models/User';
import './user.component.css';
import { Modal, Button, Form } from 'react-bootstrap';

var loggedin = false;

export const UserComponent: React.FC = () => {
    const [user, setUsers] = useState<User[]>([]);
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');


    useEffect(() => {
        login();
    }, [])

   

    const loadUser = () => {
        userRemote.getAllUsers().then(user => {
            setUsers(user);
        });        
    }

    const login = async () => {
        //
        const payload = {
            userName: inputUserName,
            password: inputPassword,
            firstName: '',
             lastName: '',
             email: '',
             roleId: 0
        };

        await userRemote.login(payload).then(user =>{
                if(user){
                    loggedin = true; 
                }
        });
        //resets form boxes
        setInputUserName('');
        setInputPassword('');  
             
       // loadUser();
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
    
                <section id="login-container">
               <form>

                <div>
                    <label><div>User Name:</div>
                    <input 
                        value={inputUserName} 
                        onChange={(e) => setInputUserName(e.target.value)} 
                        type="text" />
                    </label>
                </div>

                <div>
                    <label><div>Password:</div>
                    <input value={inputPassword} 
                        onChange={(e) => setInputPassword(e.target.value)}
                        type="text" />
                    </label>
                </div>

            <div>
                <button onClick={() => login()}>Log in</button>
            </div>

            </form>

        </section>
               
    
               
            </div>
        );
    }


}