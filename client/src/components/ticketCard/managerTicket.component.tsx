import React, { useState, useEffect } from 'react';
import { Ticket } from '../../models/Ticket';
import './ticket.component.css';
import { Modal, Button, Form, Col, Row, Container, FormCheck } from 'react-bootstrap';
import * as managerRemote from '../../remote/manager.remote';
import { User } from '../../models/User';


interface TicketCardComponentProps {
    ticket: Ticket;
    Manager: User;
}

export const ManagerTicket: React.FC<TicketCardComponentProps> = ({ ticket, Manager }) => {
    const [approved, setApproved] = useState('');

    function setStatus(stat: string | number) {

        if (stat == 1) {
            return 'Pending';
        }
        else if (stat == 2) {
            return 'Approved';
        }
        else if (stat == 3) {
            return 'Denied';
        }

    }
    function setType(type: string | number) {

        if (type == 1) {
            return 'Lodging';
        }
        else if (type == 2) {
            return 'Travel';
        }
        else if (type == 3) {
            return 'Food';
        }
        else if (type == 4) {
            return 'Other';
        }

    }
    const [inputUser, setUser] = useState('');
    const [inputManager, setManager] = useState('Unresolved');


    const getUser = (num: number | string | User) => {



        if (typeof num == 'number') {
            managerRemote.getUserById(num).then(user => {


                setUser(user[0].firstName + " " + user[0].lastName);

            });
        }
        else {
            setUser('None');
        }

        return inputUser;
    }
    const getManager = (num: number | string | User | undefined) => {

        if (!num) {
            return "Unresolved";
        }

        if (typeof num == 'number') {

            managerRemote.getUserById(num).then(user => {


                setManager(user[0].firstName + " " + user[0].lastName);

            });
        }
        else {
            setManager('Unresolved');
        }

        return inputManager;
    }

    const resolvedDate = (str: Date | string | undefined) => {

        if (str == '' || !str) {
            return 'Unresolved';
        }
        else {
            return str;
        }
    }
    //Prob wont update
    const changeStatusToApproved = (tick: Ticket) => {
        tick.reimbStatus = 2;
        tick.reimbResolver = Manager.id;
        tick.reimbResolved = new Date;
        managerRemote.changeStatus(tick)
    
    }
    const changeStatusToDenied = (tick: Ticket) => {
        tick.reimbStatus = 3;
        tick.reimbResolver = Manager.id;
        tick.reimbResolved = new Date;
        managerRemote.changeStatus(tick)
    
    }

    return (
        <div className="ticket-card">
            <div><span className="muted">Ticket ID: </span>{ticket.reimbId} </div>
            <div className='parent'>
                <div className='child inline-block-child'><span className="muted"> Amount: </span>{ticket.reimbAmount}$ </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Type: </span>{setType(ticket.reimbType)}  </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Submitted: </span>{ticket.reimbSubmitted}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Resolved Date: </span>{resolvedDate(ticket.reimbResolved)}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Submitted By: </span>{getUser(ticket.reimbAuthor)}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Approved By: </span>{getManager(ticket.reimbResolver)}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Status: </span>{setStatus(ticket.reimbStatus)}</div>
            </div>

            <div className="rem-des"><span className="muted">Description: </span>{ticket.reimbDescription}</div>
            <label> Approved   <input type="radio" value = 'Approve'  onClick={() =>  changeStatusToApproved (ticket)} />
            
             Denied <input type="radio" value = 'Deny' onClick={() =>  changeStatusToDenied (ticket)} />
            
            </label>
        </div>

        //
    )
}

