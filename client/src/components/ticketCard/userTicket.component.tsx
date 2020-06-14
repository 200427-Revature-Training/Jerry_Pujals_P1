import React, { useState, useEffect } from 'react';
import { Ticket } from '../../models/Ticket';
import './ticket.component.css';
import { Modal, Button, Form, Col, Row, Container, FormCheck } from 'react-bootstrap';


interface TicketCardComponentProps {
    ticket: Ticket;
}


export const UserTicket: React.FC<TicketCardComponentProps> = ({ ticket }) => {

    return (
        <div className="ticket-card">
            <div><span className="muted">Ticket ID: </span>{ticket.reimbId} </div>
            <div className='parent'>
                <div className='child inline-block-child'><span className="muted"> Amount: </span>{ticket.reimbAmount}$ </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Type: </span>{ticket.reimbType}  </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Submitted: </span>{ticket.reimbSubmitted}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Resolved: </span>{ticket.reimbResolved}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Approved By: </span>{ticket.reimbResolver}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Status: </span>{ticket.reimbStatus}</div>
            </div>
            <div className="rem-des"><span className="muted">Description: </span>{ticket.reimbDescription}</div>




        </div>

    )
}