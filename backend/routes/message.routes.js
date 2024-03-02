import express from 'express'
import{ sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.middleware.js';
const router= express.Router();

router.post('/sent/:id',protectRoute,sendMessage)
//here protectRoute is a middleware that will check if user is already logged in or not if user is loggedin 
//then only user will able to send a message
export default router;