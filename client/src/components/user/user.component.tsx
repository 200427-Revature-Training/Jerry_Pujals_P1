import React, { useState, useEffect } from 'react';
import * as userRemote from '../../remote/user.remote';
import { User } from '../../models/User';
import './user.component.css';
import { Modal, Button, Form, Col, Row, Container } from 'react-bootstrap';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { UserTicket } from '../ticketCard/userTicket.component';
import { Ticket } from '../../models/Ticket';



export const UserComponent: React.FC<RouteComponentProps> = (props) => {
    const [user, setUsers] = useState<User[]>([]);
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        submit();
    }, [])

    var u: User = {
        id: 0,
        userName: 'U',
        password: 'U',
        firstName: 'C',
        lastName: 'C',
        email: 'C',
        roleId: 0
    };
    u = props.location.state as User;

    // Submits a post request through ticket remote to make a new ticket
    const submit = () => {


        if (u) {
            console.log("User report:" + u.firstName);
        }
        renderUserTickets();

    }
    var t: Ticket[] = [{
        reimbId: 1,
        reimbAmount: 100,
        reimbResolved: '10/10/10',
        reimbSubmitted: '10/10/10',
        reimbDescription: 'No',
        reimbAuthor: u.firstName,
        reimbResolver: 2,
        reimbStatus: 'Pending',
        reimbType: 'Travel'

    }];



    // Creates a list of all tickets 
    const renderUserTickets = () => {
        return t.map(ticket => {
            return (<UserTicket key={ticket.reimbId} ticket={ticket}></UserTicket>)
        })

       
    }


    return (

        <div>
            <header>
                <h2
                    id="user-header" className="dark">User {}
                </h2>

            </header>



            <Row id="row">

                <Col sm={4}>
                    <div >

                        <button
                            className="btn btn-success"
                            onClick={() => setModalVisible(true)}
                        >Create Reimbursement Ticket</button>
                    </div>
                </Col>
                <Col sm >

                </Col>
                <Col sm>

                </Col>
            </Row>

            <section id="ticketContainer">
                {renderUserTickets()}
            </section>

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>New Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Ammount:</Form.Label>
                            <Form.Control type="text" value={inputUserName} onChange={(e) => setInputUserName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type:</Form.Label>
                            <Form.Control as="select" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} >
                                <option>Lodging</option>
                                <option>Travel</option>
                                <option>Food</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                    <Button onClick={() => submit()}>Submit</Button>
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
export default withRouter(UserComponent);