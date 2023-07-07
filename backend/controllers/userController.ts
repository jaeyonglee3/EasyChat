/**
 * userController.ts
 * 
 * This file contains the controller functions for user log in and sign up.
 */

import { Request, Response } from 'express';

const User = require('../models/userModel')

// Login user
const loginUser = async (req: Request, res: Response) => {
    const username = req.body.username;
    res.json({ message: `${username} has been logged in!` });
}

// Sign up user
const signupUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const user = await User.signup(username, password)
        res.status(200).json({ username, user }); 
        // res.status(200).json({ message: `Sign up successful for ${username}` }); 
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser }