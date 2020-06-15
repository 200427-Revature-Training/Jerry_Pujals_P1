import React, { useState, useEffect } from 'react';
import * as managerRemote from '../../remote/manager.remote';
import { User } from '../../models/User';
import './manager.component.css';
import { Modal, Button, Form, Col, Row, Container } from 'react-bootstrap';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { ManagerTicket } from '../ticketCard/managerTicket.component';
import { Ticket } from '../../models/Ticket';



export const ManagerComponent: React.FC<RouteComponentProps> = (props) => {
    const [ticketlist, setTickets] = useState<Ticket[]>([]);
    const [inputID, setID] = useState(0);
    const [inputAmmount, setAmmount] = useState(0);
    const [inputDateRes, setDateRes] = useState('');
    const [inputDateSub, setDateSub] = useState('');
    const [inputUser, setUser] = useState('');
    const [inputState, setState] = useState('Pending');
    const [inputType, setType] = useState('Lodging');


    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        submit();
    }, [])

    var u: User = {
        id: 0,
        userName: 'F',
        password: 'U',
        firstName: 'C',
        lastName: 'C',
        email: 'C',
        roleId: 0
    };
    u = props.location.state as User;

    // Submits a post request through ticket remote to edit a ticket
    const submit = () => {


        if (u) {
            console.log("Manager report:" + u.firstName);
        }

        getAllTickets();
        renderManagerTicket(ticketlist);
       //

    }

    var t: Ticket[] = [{
        reimbId: 0,
        reimbAmount: 100,
        reimbResolved: '10/10/10',
        reimbSubmitted: '10/10/10',
        reimbDescription: 'No',
        reimbAuthor: 'None',
        reimbResolver: 'dude',
        reimbStatus: 'Pending',
        reimbType: 'Travel'

    }];



    // Creates a list of all tickets 
    const renderManagerTicket = (ticket: Ticket[]) => {
        

        return ticket.map(ticket => {
            return (<ManagerTicket key={ticket.reimbId} ticket={ticket} Manager ={u}></ManagerTicket>)
        })


    }
    const getAllTickets = () => {

        managerRemote.getAllTickets().then(ticket => {
            setTickets(ticket);
        });
       
        
    }

    const filterTickets = (status: string) => {
        managerRemote.filterTickets(status).then(ticket => {
            setTickets(ticket);          
           
        });
        
        renderManagerTicket(ticketlist);

    }
   
    const Refresh = () => {

        managerRemote.getAllTickets().then(ticket => {
            setTickets(ticket);
        });
       renderManagerTicket(ticketlist);
       
    }

    

    return (

        <div>
            <header>
                <h2
                    id="user-header" className="dark">Manager
                </h2>

            </header>



            <Row id="row">

                <Col sm={4}>
                    <div >

                        <button
                            className="btn btn-success"
                            onClick={() => setModalVisible(true)}
                        >Filter  Tickets</button>
                        <button
                            className="btn btn-success"
                            onClick={() => Refresh()}
                        >Refresh</button>
                    </div>
                </Col>
                <Col sm >

                </Col>
                <Col sm>

                </Col>
            </Row>

            <section id="ticketContainer">
                {renderManagerTicket(ticketlist)}
            </section>

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>Filter Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        
                        <Form.Group>
                            <Form.Label>Status:</Form.Label>
                            <Form.Control as="select" value={inputState} onChange={(e) => setState(e.target.value)} >
                                <option>Pending</option>
                                <option>Approved</option>
                                <option>Denied</option>
                            </Form.Control>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                    <Button onClick={() => filterTickets(inputState)}>Search</Button>
                </Modal.Footer>
            </Modal>


        </div>
    );




}

export default withRouter(ManagerComponent);