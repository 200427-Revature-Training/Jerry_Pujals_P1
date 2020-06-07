import express from 'express';
import * as userService from '../services/user-service';

export const userRouter = express.Router();
const bcrypt = require('bcrypt');
/*
    http://localhost:3000/user
    Retrieves an array of people from database
*/
userRouter.get('', async (request, response, next) => {
    try {
        const people = await userService.getAllUsers();
        response.json(people);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }

});


userRouter.get('/login', (request, response, next) => {

    const user:any = {
        userName: request.body.userName,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        roleId: request.body.roleId
        };

    userService.login(user).then(users => {
/*
        bcrypt.compare(request.body.password, users.password).then((result) => {
           if(result)
           {
                response.json(users);
                console.log("i am user - router = user =" + users);
                if(users)
                {
                    console.log('i am a user now' + users.userName);
                }
                next();
            }
            else
            {
                // send status that password was wrong
                response.sendStatus(500);
            }

            
        });
*/
        if(request.body.password == users.password){
            
            console.log('logged in' + users.password)
            next();
        }
        else
        {
            // send status that password was wrong
            response.sendStatus(500);
        }

    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
    
});

