import express from 'express';
import * as userService from '../services/user-service';
import { User } from '../models/User';

export const userRouter = express.Router();
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
    sendAccessToken,
  } = require('./tokens.js');
const secretKey = 'qwertyuiooooooooooop';

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

    //Sends input to userService.login and puts resulting user array into response
    userService.login(user)
        .then(reuser => {
            //console.log('Return from login: '+reuser[0]);

            if(reuser[0].password === user.password){
            response.status(200);
            response.json(reuser);
            }
            else{

                console.log('Incorect user: '+user);
                response.status(404);
            }
            
            next();
        }).catch(err => {
            console.log('Error catcher. Input was: '+ [user]);
            response.sendStatus(500);
            next();
        });
    
});

userRouter.post('/login2', async (req, res) => {
    const user1 = req.body;
  
    try {
      // 1. Find user in array. If not exist send error
      const user =  userService.login(user1);
      if (!user) throw new Error('User does not exist');
      // 2. Compare crypted password and see if it checks out. Send error if not
      const valid = await compare(user1.password, user[0].password);
      if (!valid) throw new Error('Password not correct');
      // 3. Create Refresh- and Accesstoken
      const accesstoken = createAccessToken(user[0].id);
      const refreshtoken = createRefreshToken(user[0].id);
      // 4. Store Refreshtoken with user in "db"
      // Could also use different version numbers instead.
      // Then just increase the version number on the revoke endpoint
      user[0].refreshtoken = refreshtoken;
      // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
      console.log('Acc Token '+accesstoken);
      sendRefreshToken(res, refreshtoken);
      sendAccessToken(res, req, accesstoken);
      res.json(user);
    } catch (err) {
      res.send({
        error: `${err.message}`,
      });
    }
  });