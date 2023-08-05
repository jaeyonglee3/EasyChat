/**
 * conversation.ts
 * 
 * This file defines API routes for all conversation-related requests
 * These routes handle incoming HTTP requests from the frontend and interact with the corresponding controller functions to perform user authentication and registration. 
 */

import express from 'express';

const router = express.Router()
const { sendMessage, getConversationHistory, createConversation } = require('../controllers/conversationController')

// Create new conversation
router.post('/create-conversation', createConversation);

// Send a message
router.post('/send-message', sendMessage);

// Get conversation history
router.get('/get-conversation', getConversationHistory);

module.exports = router