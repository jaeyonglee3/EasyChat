/**
 * user.ts
 * 
 * This file contains the API routes for user login and sign ups.
 */

import express from 'express';

const router = express.Router()
const { loginUser, signupUser } = require('../controllers/userController')

// Login route
router.post('/login', loginUser)

// Sign up route 
router.post('/signup', signupUser)

module.exports = router