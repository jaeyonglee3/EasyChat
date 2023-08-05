/**
 * server.ts
 * 
 * This file contains the configuration and initialization of the server.
 * It sets up the server (express app), defines routes, and starts listening for incoming requests.
 */
import express, { Application } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

const mongoose = require('mongoose')
const userRoutes = require('./routes/user.ts')
const conversationRoutes = require('./routes/conversation.ts')

dotenv.config();
const app: Application = express();

// Set up socket.io server
const server = http.createServer(app);
const io = new Server(server);

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

// // Listen for incoming Socket.io connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle events and actions for this socket connection
//   // socket.on is a method that allows a server or client to listen for a specific event emitted by the other party
//   // Example event handlers:
//   socket.on('message', (data) => {
//     io.to(data.roomId).emit('message', { text: data.text, user: data.user });
//     // TODO: add code to modify mongoDB database that stores all the conversations
//     console.log(`Message received: ${data.text}`);
//   });

//   socket.on('joinRoom', (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);
//   });

//   socket.on('leaveRoom', (roomId) => {
//     socket.leave(roomId);
//     console.log(`User left room: ${roomId}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // Start the socket.io server
// const PORT = 6000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Connect to db
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