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



userRouter.post('/id', (request, response, next) => {
  const id = request.body.id;
  userService.getUserById(id).then(user => {
      if (!user) {
      //    response.sendStatus(404);
      } else {
      let  u : User[] = [user];
  //    response.sendStatus(200);
          response.json(u);
      }
      next();
  }).catch(err => {
      console.log(err);
      response.sendStatus(500);
      next();
  })
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
           // console.log('Error catcher. Input was: '+ [user]);
           console.log(user);
            response.sendStatus(500);
            next();
        });
    
});



