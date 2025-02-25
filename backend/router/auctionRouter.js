import express from "express"
import { addItem } from "../controllers/auctionController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createitem',isAuthenticated,isAuthorized("Auctioneer"),addItem)

export default router