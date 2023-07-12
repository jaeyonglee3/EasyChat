/**
 * userController.ts
 * 
 * This file contains the controller functions for user log in and sign up.
 */

import { Request, Response } from 'express';

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Create token function
const createToken = (_id: string) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d' })
}

// Login user
const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)

        res.status(200).json({ username, token }); 
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }

    res.json({ message: `${username} has been logged in!` });
}

// Sign up user
const signupUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const user = await User.signup(username, password)
        const token = createToken(user._id)
        res.status(200).json({ username, token }); 
        // res.status(200).json({ message: `Sign up successful for ${username}` }); 
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser }