/**
 * conversationController.ts
 * 
 * This file contains the controller functions for all conversation-related operations.
 */

import { Request, Response } from 'express';
import { Socket } from 'socket.io';

const Conversation = require('../models/conversationModel')

type MessageData = {
    conversationId: string;
    sender: string;
    content: string;
    timestamp: Date;
};

// Send a message
export const sendMessage = async (socket: Socket, messageData: MessageData) => {
    const { conversationId, sender, content, timestamp } = messageData;

    try {
        await Conversation.sendMessage(conversationId, sender, content, timestamp);
        socket.to(conversationId).emit('message', { sender, content, timestamp });
    } catch (error: any) {
        console.log('send message error')
    }
};

// Create a conversation
const createConversation = async (req: Request, res: Response) => {
    const { participant1, participant2 } = req.body

    try {
        const id = await Conversation.createConversation(participant1, participant2)
        res.status(200).json({ id }); 
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Get conversation history
const getConversationHistory = async (req: Request, res: Response) => {
    const participant1 = req.query.participant1
    const participant2 = req.query.participant2

    try {
      const messagesAndId = await Conversation.getConversation(participant1, participant2);
      res.status(200).json(messagesAndId)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { createConversation, sendMessage, getConversationHistory }
