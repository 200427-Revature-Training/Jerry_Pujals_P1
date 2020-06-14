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
//Get array of tickets using user id
ticketRouter.post('/id', async (request, response, next) => {

    //Gets status string from request input
    let id = request.body.id;

console.log(id);

    ticketService.getById(id)
    .then(reuser => {
        //console.log('Return from login: '+reuser[0]);

        if(reuser[0].reimbAuthor){
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

ticketRouter.post('/newTicket', async (request, response, next) => {

    //Gets status string from request input
    let ticket = request.body.ticket;

console.log(ticket);
ticketService.newTicket(ticket);
/*
    ticketService.newTicket(ticket)
    .then(reuser => {
        //console.log('Return from login: '+reuser[0]);

        if(reuser[0].reimbAuthor){
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
*/
});


ticketRouter.post('/filter', async (request, response, next) => {

    //Gets status string from request input
    let status = request.body.status;

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
