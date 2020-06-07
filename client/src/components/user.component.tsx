import React, { useState, useEffect } from 'react';
import * as userRemote from '../remote/user.remote';
import { User } from '../models/User';
import './user.component.css';
import { Modal, Button, Form } from 'react-bootstrap';

var loggedin = false;
var userp;

export const UserComponent: React.FC = () => {
    const [user, setUsers] = useState<User[]>([]);
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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
            id: 0,
            userName: inputUserName,
            password: inputPassword,
            firstName: '',
             lastName: '',
             email: '',
             roleId: 0
        };

        await userRemote.login(payload).then(user =>{
                if(user){
                   // loggedin = true; 
                   userRemote.getAllUsers().then(user => {
                    setUsers(user);
                });   
                }
        });
        //resets form boxes
        setInputUserName('');
        setInputPassword('');  
        setModalVisible(false)
        loadUser();
    }



    return (
        <div>
            <header>
                <h2 
                id="user-header" className="dark">User Section     
                <button 
                        className="btn btn-success"
                        onClick={() => setModalVisible(true)}
                        >Login</button>
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

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="text" value={inputUserName} onChange={(e) => setInputUserName(e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" value={inputPassword} onChange={(e) => setInputPassword(e.target.value) } />
                        </Form.Group>                      
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                    <Button onClick={() => login()}>Login</Button>
                </Modal.Footer>
            </Modal>

           
        </div>
    );
   
      


}