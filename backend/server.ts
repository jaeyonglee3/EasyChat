/**
 * server.ts
 * 
 * This file contains the configuration and initialization of the server.
 * It sets up the server (express app), defines routes, and starts listening for incoming requests.
 */
import express, { Application } from 'express';
require('dotenv').config()

const app: Application = express();

// Log the requests being made 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});