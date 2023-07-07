/**
 * userModel.ts
 * 
 * This file defines the structure for user documents that will be saved in the db.
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// Static sign up method
userSchema.statics.signup = async function (username, password) {
    const exists = await this.findOne({ username })

    if (exists) {
        throw Error("Username already exists")
    } else {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await this.create({ username, password: hash})
        
        return user
    }
}

module.exports = mongoose.model('User', userSchema)