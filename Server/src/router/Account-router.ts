import express from 'express';
import * as AccountService from '../services/Account-service';

// Set export
export const AccountRouter = express.Router();

//  Get   http://localhost:3000/Admin_Accounts

AccountRouter.get('', (request, response, next) => {
    AccountService.adminGetAccounts().then(accounts => {
        response.set('content-type', 'application/json');
        response.json(accounts);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});




//  GET   http://localhost:3000/Admin_Accounts/id

AccountRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    
    AccountService.adminGetAccountById(id).then(account => {
        if (!account) {
            response.sendStatus(404);
        } else {
            response.json(account);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
});

/*
    POST http://localhost:3000/Admin_Accounts
*/
AccountRouter.post('', (request, response, next) => {
    const account = request.body;
    AccountService.makeAccount(account)
        .then(newAccount => {
            
            response.status(201);
            response.json(newAccount);
            next();
        }).catch(err => {
            response.sendStatus(500);
            next();
        });
});

