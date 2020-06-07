import express from 'express';
import * as userService from '../services/user-service';

export const userRouter = express.Router();

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

