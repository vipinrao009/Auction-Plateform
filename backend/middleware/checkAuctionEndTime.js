import { Auction } from "../model/auctionSchema.js";
import AsyncHandler from "./AsyncHandler.js";
import ErrorHandler from "./error.js";

export const checkAuctionEndTime = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const auction = await Auction.findById(id);
    if (!auction) {
        return next(new ErrorHandler("Auction not found", 400));
    }

    if (auction.startingTime > Date.now()) {
        return next(new ErrorHandler("Auction not started yet...", 400));
    }

    if (auction.endingTime < Date.now()) {
        return next(new ErrorHandler("Auction has ended now...", 400));
    }

    next();
});
