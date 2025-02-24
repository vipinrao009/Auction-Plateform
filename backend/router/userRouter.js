import express from "express"
import { fetchLeaderboard, getProfile, login, logout, register } from "../controllers/userController.js";

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.get('/get',getProfile)
router.get('/leaderboard',fetchLeaderboard)
router.get('/logout',logout)
export default router