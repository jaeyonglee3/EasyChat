/**
 * user.ts
 * 
 * This file defines API routes for all user related requests.
 * These routes handle incoming HTTP requests from the frontend and interact with the corresponding controller functions to perform user authentication and registration. 
 */

import express from 'express';

const router = express.Router()
const { loginUser, signupUser, deleteUserAccount, addFriend, getFriends } = require('../controllers/userController')

// Login route
router.post('/login', loginUser)

// Sign up route 
router.post('/signup', signupUser)

// Delete account route
router.delete('/delete-account', deleteUserAccount)

// Add a friend route
router.patch('/add-friend', addFriend)

// Get user's friends route
router.get('/get-friends', getFriends)

module.exports = router