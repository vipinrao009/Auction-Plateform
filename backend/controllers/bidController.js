import mongoose from "mongoose"
import AsynceHandler from "../middleware/AsyncHandler.js"
import { Auction } from "../model/auctionSchema.js"
import ErrorHandler from "../middleware/error.js"
import { Bid } from "../model/bidSchema.js"
import { User } from "../model/userSchema.js"


export const placeBid = AsynceHandler(async(req,res,next)=>{
    const {id} = req.params
    const item = await Auction.findById(id)
    
    if(!item){
        return next(new ErrorHandler("Auction item not found",400))
    }

    const {amount} = req.body
    if(!amount){
        return next(new ErrorHandler("Please place your bid",400))
    }
    if(amount < item.currentBid){
        return next(new ErrorHandler("Bid amount must be greater than the current bid",400))
    }
    if(amount < item.startingBid){
        return next(new ErrorHandler("Bid amount must be greater than the starting bid",400))
    }
   
    try {
        const existingBid = await Bid.findOne({
            "bidder.id": req.user._id,
            "auction.id" : item._id
        })
        const existingBidAuction = item.bids.find(bid => bid.userId.toString() == req.user._id.toString())

        if(existingBid && existingBidAuction){
            existingBidAuction.amount = amount;
            existingBid.amount = amount;
            await existingBidAuction.save()
            await existingBid.save()
            item.currentBid = amount
        }else{
            const bidderDetail = await User.findById(req.user._id)
            const bid = await Bid.create({
                amount,
                bidder: {
                    id:bidderDetail._id,
                    userName:bidderDetail.userName,
                    profileImage:bidderDetail.profileImage
                },
                auction: { 
                    id: item._id // 👈 Is tarah pass kar!
                },
            })
            item.bids.push({
                userId:req.user._id,
                userName:bidderDetail.userName,
                profileImage:bidderDetail.profileImage?.url,
                amount
            })
            item.currentBid = amount
        }
        await item.save();
        res.status(200).json({
            success:true,
            message:"Bid placed successfully",
            currentBid:item.currentBid
        })
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to place bid",400))
    }

})