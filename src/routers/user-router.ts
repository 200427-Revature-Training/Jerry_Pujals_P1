import express from 'express';
import * as userService from '../services/user-service';
import { User } from '../models/User';

export const userRouter = express.Router();
const bcrypt = require('bcrypt');
/*
    http://localhost:3000/user
    Retrieves an array of people from database
*/
userRouter.get('', async (request, response, next) => {
    try {
        const users = await userService.getAllUsers();
        response.json(users);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }

});


userRouter.post('/login', (request, response, next) => {

    //Gets user object from request input
    const user = request.body;

    //Sends input to userService.login and puts result into users var   
    userService.login(user)
        .then(reuser => {
            if(reuser[0].password === user[0].password){
            response.status(200);
            response.json(reuser);
            }
            else{

                console.log('Incorect user: '+user);
                response.status(404);
            }
            
            next();
        }).catch(err => {
            console.log(user);
            response.sendStatus(500);
            next();
        });
    
});

