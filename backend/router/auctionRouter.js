import express from "express"
import { addItem, deletAuction, getAllItems, getAuctionDetails, getMyAuction, republishAuction } from "../controllers/auctionController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createitem',isAuthenticated,isAuthorized("Auctioneer"),addItem)
router.get("/allitem",getAllItems)
router.get("/allitem/details/:id",isAuthenticated,getAuctionDetails)
router.get("/getmyauction",isAuthenticated,isAuthorized("Auctioneer"),getMyAuction)
router.delete("/deleteauction/:id",isAuthenticated,isAuthorized("Auctioneer"),deletAuction)
router.put("/republish/:id",isAuthenticated,isAuthorized("Auctioneer"),republishAuction)

export default router