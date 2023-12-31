/**
 * userModel.ts
 * 
 * This file defines the structure for user documents that will be saved in the users collection.
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Import for password validation
// import validator from "validator";

const Schema = mongoose.Schema

// Define the attributes that each user will have
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
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
    const user = await this.findOne({ username })
    if (!user) {
        throw Error("Username not found.")
    }
    await this.findByIdAndDelete(user);
}

// Static add friend method (used by MongoDB)
userSchema.statics.addFriend = async function (currUsername, friendToAdd) {
    const user = await this.findOne({ username: currUsername })
    if (!user) {
        throw Error("Username not found.")
    }

    const userToAdd = await this.findOne({ username: friendToAdd })
    console.log(userToAdd)
    if (!userToAdd) {
        throw Error("Username does not exist.")
    }

    if (user.friends.includes(userToAdd._id)) {
        throw Error("User is already a friend.")
    }

    user.friends.push(userToAdd)
    userToAdd.friends.push(user)
    await user.save()
    await userToAdd.save()
}

// Static get friends method (used by MongoDB)
userSchema.statics.getFriends = async function (currUsername) {
    const user = await this.findOne({ username: currUsername })
    if (!user) {
        throw Error("Username not found.")
    }

    // Simply return user.friends for array of object IDs
    // return user.friends

    const friendUserIds = user.friends; 
    const friendUserPromises = friendUserIds.map((friend: any) => {
        return this.findById(friend);
    });

    const friendUsers = await Promise.all(friendUserPromises);  // Ensure all promises are resolved
    const friendUsernames = friendUsers.map((friendUser: any) => {
        return friendUser.username;
    });

    return friendUsernames;
}

module.exports = mongoose.model('User', userSchema)