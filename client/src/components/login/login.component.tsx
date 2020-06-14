import React, { useState, useEffect } from 'react';
import * as loginRemote from '../../remote/login.remote';
import { User } from '../../models/User';
import './login.component.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { rename } from 'fs';
import { useHistory } from "react-router-dom";
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';


export const LoginComponent: React.FC<RouteComponentProps> = (props) => {
    const [user, setUsers] = useState<User[]>([]);
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        login();
    }, [])

    const history = useHistory();

    const login = () => {
        //
        const payload: User = {
            id: 0,
            userName: inputUserName,
            password: inputPassword,
            firstName: '',
            lastName: '',
            email: '',
            roleId: 0
        };
        if (payload.userName != '' && payload.password != '') {
            loginRemote.login(payload).then(user => {

                var u = user[0];

                if (user[0].roleId == 1) {

                    history.push("/user", u);
                }
                else if (user[0].roleId == 2) {
                    history.push("/manager", u);
                }

            });
        }
        //resets form boxes
        setInputUserName('');
        setInputPassword('');
        setModalVisible(false)
        // loadUser();
    }



    return (
        <div>
            <header>
                <h2
                    id="user-header" className="dark">ERS

                </h2>

            </header>

            <div>
                <button
                    className="btn btn-success"
                    onClick={() => setModalVisible(true)}
                >Login</button>
            </div>

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="text" value={inputUserName} onChange={(e) => setInputUserName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
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


/*conditionally render the username of the user when logged in and otherwise render 'Login' when not logged in
const MyComponent: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    return (
        <div>
            { loggedIn ? username : 'login' }
        </div>
    );


*/
export default withRouter(LoginComponent);