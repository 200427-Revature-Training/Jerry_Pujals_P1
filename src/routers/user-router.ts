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
        const users = await userService.getAllUsers();
        response.json(users);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }

});


userRouter.post('/login', (request, response, next) => {

    //Gets user object from request input
    const user:any = {
        userName: request.body.userName,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        roleId: request.body.roleId
        };

    //Sends input to userService.login and puts result into users var    
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

      

    }).catch(err => {
        console.log(userService.login(user));
        console.log(err);
        response.sendStatus(500);
        next();
    });
    
});

