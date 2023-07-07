/**
 * server.ts
 * 
 * This file contains the configuration and initialization of the server.
 * It sets up the server (express app), defines routes, and starts listening for incoming requests.
 */
import express, { Application } from 'express';
require('dotenv').config()
const mongoose = require('mongoose')

const app: Application = express();

// Log the requests being made 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests only once we've connected to the db
    app.listen(process.env.PORT, () => {
    console.log("Connected to database and listening on port", process.env.PORT)
})
  })
  .catch((error: any) => {
    console.log(error)
  })