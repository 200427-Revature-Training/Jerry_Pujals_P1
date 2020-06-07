import React, { useState, useEffect } from 'react';
import * as userRemote from '../remote/user.remote';
import { User } from '../models/User';
import './user.component.css';
import { Modal, Button, Form } from 'react-bootstrap';

export const UserComponent: React.FC = () => {
    const [user, setUsers] = useState<User[]>([]);

   
    // We need to get data for our application
    // So we should send a request to our API to acquire it
    // 1. A get request is sent
    // 2. Update state with new data
    // 3. Component rerenders

    // send get request
    // will this work? -- This will send the request repeatedly, each state update causing
    // a new request to be sent - DO NOT DO
    // userRemote.getAllPeople().then(people => {
    //     setUsers(people);
    // });

    /*
        ! The Problem
        Everytime the state updates component must reevaluated.  Because the request was
        directly in the component's code, this caused the request to be sent again, which
        triggered more and more state updates and more requests being sent. 
    
        The React component lifecycle - Lifecycle methods are methods which are called on
        certain lifecycle stages for some process and are generally offered as mechanisms
        to hook in custom functionality to an internal process.
    */

    /* 
        ! The Solution - useEffect
        useEffect is a lifecycle 'hook' and is part of a group of functions called 
        React hooks (alongside useState). useEffect us used to describe some effect
        that should take place as a side effect of the component rerendering. useEffect
        can take in 1-2 arguments with the first argument being the intended effect. The
        second argument takes an array of values and will reevaluate the effect if those
        values change - this is intended to be a mechanism for the effect to intelligently
        know when to reevaluate.  Note: For effects that should only happen once, we can
        simply pass an [] to the second argument.
    */

    useEffect(() => {
        loadUser();
    }, [])

   

    const loadUser = () => {
        userRemote.getAllUsers().then(user => {
            setUsers(user);
        });        
    }


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