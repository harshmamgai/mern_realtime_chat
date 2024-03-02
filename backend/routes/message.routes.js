import express from 'express'
import{ sendMessage } from '../controllers/message.controller.js';
const router= express.Router();

router.post('/sent/:id',sendMessage)
export default router;