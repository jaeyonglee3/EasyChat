/**
 * userController.ts
 * 
 * This file contains the controller functions for user log in and sign up.
 */

import { Request, Response } from 'express';

// Login user
const loginUser = async (req: Request, res: Response) => {
    const username = req.body.username;
    res.json({ message: `${username} has been logged in!` });
}

// Sign up user
const signupUser = async (req: Request, res: Response) => {
    const username = req.body.username;
    res.json({ message: `Sign up successful for ${username}` });
}

module.exports = { loginUser, signupUser }