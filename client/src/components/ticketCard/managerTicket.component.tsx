import React, { useState, useEffect } from 'react';
import { Ticket } from '../../models/Ticket';
import './ticket.component.css';
import { Modal, Button, Form, Col, Row, Container, FormCheck } from 'react-bootstrap';


interface TicketCardComponentProps {
    ticket: Ticket;
}

export const ManagerTicket: React.FC<TicketCardComponentProps> = ({ ticket }) => {
    const [approved, setApproved] = useState(false);

function setStatus(stat:string | number){

    if(stat == 1){
        return 'Pending';
    }
    else if(stat == 2){
        return 'Approved';
    }
    else if(stat == 3){
        return 'Denied';
    }

}
    return (
        <div className="ticket-card">
            <div><span className="muted">Ticket ID: </span>{ticket.reimbId} </div>
            <div className='parent'>
                <div className='child inline-block-child'><span className="muted"> Amount: </span>{ticket.reimbAmount}$ </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Type: </span>{ticket.reimbType}  </div>
                <div className='child inline-block-child'><span className="muted">&ensp; Submitted: </span>{ticket.reimbSubmitted}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Resolved: </span>{ticket.reimbResolved}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Submitted By: </span>{ticket.reimbAuthor}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Approved By: </span>{ticket.reimbResolver}</div>
                <div className='child inline-block-child'><span className="muted">&ensp; Status: </span>{setStatus(ticket.reimbStatus)}</div>
            </div>

            <div className="rem-des"><span className="muted">Description: </span>{ticket.reimbDescription}</div>

        </div>

        // <Form.Check  value={approved} onChange={(e) => setApproved(e.target.value) } >

        // </Form.Check>
    )
}

