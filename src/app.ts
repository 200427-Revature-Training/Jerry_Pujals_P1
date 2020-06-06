import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { peopleRouter } from './routers/people-router';

const app = express();

const port = process.env.port || 3000;
app.set('port', port);

/* CORS middleware - Sets CORS headers to allow requests from
        the domain of the intended client */
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://jerrypujalshomeapp.s3.us-east-2.amazonaws.com');
    response.setHeader('Access-Control-Allow-Headers', 'content-type')
    // response.setHeader('Access-Control-Allow-Methods', 'GET POST');
    next();
})

/*
    ? Middleware Registration
*/
app.use(bodyParser.json());

/*
    ? Router Registration
*/
app.use('/people', peopleRouter);

/*
    Listen for SIGINT signal - issued by closing the server with ctrl+c
    This releases the database connections prior to app being stopped
*/
// process.on('SIGINT', () => {
//     db.end().then(() => {
//         console.log('Database pool closed');
//     });
// });

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});