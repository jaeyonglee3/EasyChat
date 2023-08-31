/**
 * conversationModel.ts
 * 
 * This file defines the structure for conversations documents that will be saved in the conversations collection.
 */

import mongoose from "mongoose";
const Schema = mongoose.Schema

// Define the attributes that each conversation will have
// Participants field is an array of ObjectIds that references documents from the User collection
const conversationSchema = new Schema({
    participants: [String],
    messages: [{
        sender: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }]
})

// Static create new conversation method (used by MongoDB)
conversationSchema.statics.createConversation = async function (participant1: String, participant2: String) {
    const newConversation = await this.create({
        participants: [ participant1, participant2 ],
        messages: [],
    });
    return newConversation._id;
}

// Static send message method (used by MongoDB)
conversationSchema.statics.sendMessage = async function (conversationId: string, sender: string, content: string, timestamp: Date) {
    const conversation = await this.findById(conversationId);

    if(!conversation) {
        throw Error("Conversation with that ID not found.")
    }

    conversation.messages.push({ sender, content, timestamp });
    await conversation.save();
}

// Static get conversation (used by MongoDB)
conversationSchema.statics.getConversation = async function (participant1: String, participant2: String) {
    const conversation = await this.findOne({
        participants: {
            $all: [participant1, participant2],
        },
    });

    if (!conversation) {
        return null
    }

    const id = conversation._id
    const messages = conversation.messages
    return ({ id, messages });
}

module.exports = mongoose.model('Conversation', conversationSchema)