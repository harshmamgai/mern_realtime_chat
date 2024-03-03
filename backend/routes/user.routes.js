import express from 'express';
import { getUsersForSideBar } from '../controllers/getUsersForSideBar.controller.js';
import protectRoute from '../middleware/protectRoute.middleware.js';
const router = express.Router();

router.get('/',protectRoute,getUsersForSideBar);
export default router;