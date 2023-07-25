/**
 * user.ts
 * 
 * This file defines API routes for user login and sign-ups. 
 * These routes handle incoming HTTP requests from the frontend and interact with the corresponding controller functions to perform user authentication and registration. 
 */

import express from 'express';

const router = express.Router()
const { loginUser, signupUser, deleteUserAccount } = require('../controllers/userController')

// Login route
router.post('/login', loginUser)

// Sign up route 
router.post('/signup', signupUser)

// Delete account route
router.delete('/delete-account', deleteUserAccount);

module.exports = router