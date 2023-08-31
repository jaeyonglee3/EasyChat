/**
 * server.ts
 * 
 * This file contains the configuration and initialization of the server.
 * It sets up the server (express app), defines routes, and starts listening for incoming requests.
 */

import express, { Application } from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { sendMessage } from './controllers/conversationController';

const mongoose = require('mongoose')
const userRoutes = require('./routes/user.ts')
const conversationRoutes = require('./routes/conversation.ts')
const app: Application = express();
dotenv.config();

export const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.listen(3001);

// Middleware
// Used to parse incoming JSON data from HTTP requests
// Parses the JSON data in the request body, making it accessible in the req.body object of the route handlers.
app.use(express.json());

// Log the requests being made to terminal
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app'})
})

// User routes are defined in a separate file for organization, modularity, and readability
app.use('/api/user', userRoutes)

// Conversation routes are defined in a separate file for organization, modularity, and readability
app.use('/api/conversation', conversationRoutes)

// Listen for incoming Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (messageData) => {
    io.to(messageData.conversationId).emit('message', messageData);
    sendMessage(socket, messageData)
    console.log(`Message received: ${messageData.content}`);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
    console.log("Connected to database and listening on port", process.env.PORT)
  })
})
  .catch((error: any) => {
    console.log(error)
})