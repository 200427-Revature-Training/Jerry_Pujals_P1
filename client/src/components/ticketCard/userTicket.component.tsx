import React, { useState, useEffect } from 'react';
import { Ticket } from '../../models/Ticket';
import './ticket.component.css';
import { Modal, Button, Form, Col, Row, Container, FormCheck } from 'react-bootstrap';
import * as userRemote from '../../remote/user.remote';
import { User } from '../../models/User';


interface TicketCardComponentProps {
    ticket: Ticket;
}


export const UserTicket: React.FC<TicketCardComponentProps> = ({ ticket }) => {


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
    const [inputManager, setManager] = useState('Unresolved');


   
    const getManager = (num: number | string | User | undefined) => {

 if(!num){
     return "Unresolved";
 }
 
         if (typeof num == 'number') {
             userRemote.getResolver(num).then(user => {
                
 
                 setManager(user[0].firstName + " " + user[0].lastName);
 
             });
            // return 'not yet';
         }
         else {
             setManager('Unresolved');
         }
 
         return inputManager;
     }

     const resolvedDate = (str: Date | string | undefined) => {

        if(str == '' || !str){
            return 'Unresolved';
        }
        else{
            return str;
        }
     }


    return (
        <div className="ticket-card">
            <div><span className="muted">Ticket ID: </span>{ticket.reimbId} </div>
            <div className='parent'>
                <div className='child inline-block-child'><span className="muted"> Amount: </span>{ticket.reimbAmount}$ </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Type: </span>{setType(ticket.reimbType)}  </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Submitted: </span>{ticket.reimbSubmitted}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Resolved Date: </span>{resolvedDate(ticket.reimbResolved)}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Approved By: </span>{getManager(ticket.reimbResolver)}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Status: </span>{setStatus(ticket.reimbStatus)}</div>
            </div>
            <div className="rem-des"><span className="muted">Description: </span>{ticket.reimbDescription}</div>




        </div>

    )
}