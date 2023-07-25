/**
 * userModel.ts
 * 
 * This file defines the structure for user documents that will be saved in the db.
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Import for password validation
// import validator from "validator";

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

// Static sign up method (used by MongoDB)
userSchema.statics.signup = async function (username: string, password: string) {
    const exists = await this.findOne({ username })

    if (!username || !password) {
        const missingField = !username ? "username" : "password";
        throw Error("A " + missingField + " is required!")
    }

    // Validate password strength
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password not strong enough.')
    // }

    if (exists) {
        throw Error("Username already exists.")
    } else {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await this.create({ username, password: hash})
        
        return user
    }
}

// Static login method (used by MongoDB)
userSchema.statics.login = async function (username: string, password: string) {
    if (!username || !password) {
        const missingField = !username ? "username" : "password";
        throw Error("A " + missingField + " is required!")
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error("Username not found.")
    }

    // Try to match password with the one in the database
    const match = await bcrypt.compare(password, user.password)

    if (match) {
        return user
    } else {
        throw Error('Incorrect password!')
    }
}

// Static user account delete method (used by MongoDB)
userSchema.statics.deleteAccount = async function (username) {
    try {
      const user = await this.findOne({ username })
      const deletedUser = await this.findByIdAndDelete(user);
      return deletedUser;
    } catch (error) {
      throw new Error('Account deletion failed');
    }
}

module.exports = mongoose.model('User', userSchema)