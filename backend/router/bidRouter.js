import express from "express"
import { placeBid } from "../controllers/bidController.js"
import {isAuthenticated, isAuthorized} from "../middleware/authMiddleware.js"
import { checkAuctionEndTime } from "../middleware/checkAuctionEndTime.js"

const router = express.Router()

router.post("/place/:id",isAuthenticated,isAuthorized("Bidder"),checkAuctionEndTime,placeBid)

export default router