import React, { useState, useEffect } from 'react';
import * as peopleRemote from '../remote/people.remote';
import { Person } from '../models/Person';
import './accounts.component.css';
import { Modal, Button, Form } from 'react-bootstrap';

export const AccountComponent: React.FC = () => {
    const [users, setUsers] = useState<Person[]>([]);

    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputBirthdate, setInputBirthdate] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    // We need to get data for our application
    // So we should send a request to our API to acquire it
    // 1. A get request is sent
    // 2. Update state with new data
    // 3. Component rerenders

    // send get request
    // will this work? -- This will send the request repeatedly, each state update causing
    // a new request to be sent - DO NOT DO
    // peopleRemote.getAllPeople().then(people => {
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
        loadPeople();
    }, [])

    const addUser = async () => {
        const payload = {
            firstName: inputFirstName,
            lastName: inputLastName,
            birthdate: inputBirthdate
        };

        await peopleRemote.createPerson(payload);
        setInputBirthdate('');
        setInputFirstName('');
        setInputLastName('');
        setModalVisible(false)
        loadPeople();
    }

    const loadPeople = () => {
        peopleRemote.getAllPeople().then(people => {
            setUsers(people);
        });        
    }


    return (
        <div>
            <header>
                <h2 id="accounts-header" className="dark">Accounts Section 
                    <button 
                        className="btn btn-success"
                        onClick={() => setModalVisible(true)}
                        >Add Person</button>
                </h2>
            </header>

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Birth Date</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return (<tr key={u.id}>
                            <th scope="row">{u.id}</th>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{typeof u.birthdate == 'string' ? 
                                    u.birthdate : 
                                    u.birthdate.toDateString()}</td>
                        </tr>)
                    })}
                </tbody>
            </table>

            {/* react-bootstrap components */}
            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type="text" value={inputFirstName} onChange={(e) => setInputFirstName(e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" value={inputLastName} onChange={(e) => setInputLastName(e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthdate:</Form.Label>
                            <Form.Control type="date" value={inputBirthdate} onChange={(e) => setInputBirthdate(e.target.value) } />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                    <Button onClick={() => addUser()}>Submit</Button>
                </Modal.Footer>
            </Modal>

           
        </div>
    );
}