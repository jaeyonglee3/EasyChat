/**
 * userModel.ts
 * 
 * This file defines the structure for user documents that will be saved in the db.
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)