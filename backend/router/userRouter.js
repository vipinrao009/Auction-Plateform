import express from "express"
import { fetchLeaderboard, getProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.get('/me',isAuthenticated,getProfile)
router.get('/leaderboard',fetchLeaderboard)
router.get('/logout',isAuthenticated,logout)
export default router