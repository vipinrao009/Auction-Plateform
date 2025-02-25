import AsyncHandler from "../middleware/AsyncHandler.js";
import ErrorHandler from "../middleware/error.js";
import { Auction } from "../model/auctionSchema.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addItem = AsyncHandler(async(req,res,next)=>{
    if(!req.files ||Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Auction image required !!!", 400))
    }

    const { image } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if (!allowedFormats.includes(image.mimetype)) {
        return next(new ErrorHandler("File format not supported.", 400));
    }

    const {
        title,
        description,
        category,
        condition,
        startingBid,
        currentBid,
        startingTime,
        endingTime,
    } = req.body

    if(!title || !description || !category || !condition || !startingBid || !currentBid || !startingTime || !endingTime){
        return next(new ErrorHandler("All Fields are required!!"))
    }
    if(new Date(startingTime) < new Date(endingTime)){
       return next(new ErrorHandler("Auction starting time must be greater than present time"))
    }
    if(new Date(startingTime) >= new Date(endingTime)){
        return next(new ErrorHandler("Auction starting time must be less than ending time"))
    }
   
    const alreadyOneAuctionActive = await Auction.find({
        createdBy: req.user._id,
        endingTime: { $gt: Date.now() },
      });
      if (alreadyOneAuctionActive.length > 0) {
        return next(new ErrorHandler("You already have one active auction.", 400));
      }
    

    try {
        const avatar = await uploadOnCloudinary(image.tempFilePath)
        if(!avatar){
            return next(new ErrorHandler("Upload failed on cloudinary !!!",400))
        }
    
        const auctionItem = await Auction.create({
            title,
            description,
            category,
            condition,
            startingBid,
            currentBid,
            startingTime,
            endingTime,
            createdBy: req.user._id,
            image:{
                public_id: avatar.public_id,
                url:avatar.secure_url
            }
        })
    
        res.status(200).json({
            success:true,
            message:`Auction item created and will be listed on auction page at ${startingTime}`,
            auctionItem
        })
    } catch (error) {
        return next(new ErrorHandler(error.message) || "Failed to create item")
    }
}) 