import express from 'express';
import * as ticketService from '../services/ticket-serivce';
import { Ticket } from '../models/Ticket';

export const ticketRouter = express.Router();


/*
    http://localhost:3000/ticket
    Retrieves an array of tickets from DB
*/

ticketRouter.get('', async (request, response, next) => {
    try {
        const ticket = await ticketService.getAllTickets();
        response.json(ticket);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }

});


ticketRouter.post('/filter', async (request, response, next) => {

    //Gets status string from request input
    let status = request.body;
/*
    console.log(status);
    try {
        const ticket = await ticketService.filter(status);
        response.json(ticket);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
*/
console.log(status);

    ticketService.filter(status)
    .then(reuser => {
        //console.log('Return from login: '+reuser[0]);

        if(reuser[0].reimbStatus){
        response.status(200);
        response.json(reuser);
        }
        else{
            response.status(404);
        }
        
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });

});


ticketRouter.patch('/setStatus', (request, response, next) => {
    const upTicket = request.body;
    ticketService.setStatus(upTicket)
        .then(updatedTicket => {
            if (updatedTicket) {
                response.json(ticketService.getAllTickets());
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});
