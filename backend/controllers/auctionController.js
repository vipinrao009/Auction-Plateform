import mongoose from "mongoose";
import AsyncHandler from "../middleware/AsyncHandler.js";
import ErrorHandler from "../middleware/error.js";
import { Auction } from "../model/auctionSchema.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../model/userSchema.js";

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

export const getAllItems = AsyncHandler(async(req,res,next)=>{
    let items = await Auction.find()
    if(!items){
        return next(new ErrorHandler("Failed to fetch all auction",400))
    }

    res.status(200).json({
        success:true,
        message: "Items fetched successfully!!",
        items
    })
})

export const getAuctionDetails = AsyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invailid format Id",404))
    }

    const item = await Auction.findById(id)
    if(!item){
        return next(new ErrorHandler("Auction not found",400))
    }
    const bidders = item.bids.sort((a,b)=>b.bid - a.bid)
    res.status(200).json({
        success:true,
        message:"Auction fetched successfully",
        item,
        bidders
    })
})

export const getMyAuction = AsyncHandler(async(req,res,next)=>{
   const items = await Auction.find({createdBy:req.user.id})
   console.log(items)
   res.status(200).json({
    success:true,
    message:"Auction fetched successfully",
    items
   })
})

export const deletAuction = AsyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invailid format Id",404))
    }

    await Auction.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        message:"Auction deleted successfully"
    })
})

export const republishAuction = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid format Id", 400));
    }

    // Validate request body
    if (!req.body.startingTime || !req.body.endingTime) {
        return next(new ErrorHandler("Start time and end time are necessary", 400));
    }

    // Convert to Date object and validate
    const startingTime = new Date(req.body.startingTime);
    const endingTime = new Date(req.body.endingTime);

    if (isNaN(startingTime.getTime()) || isNaN(endingTime.getTime())) {
        return next(new ErrorHandler("Invalid date format for starting or ending time", 400));
    }

    const items = await Auction.findById(id);
    if (!items) {
        return next(new ErrorHandler("Auction not found", 400));
    }

    // Check if auction is already active
    if (new Date(items.endingTime).getTime() > Date.now()) {
        return next(new ErrorHandler("Auction is already active, can not republish", 400));
    }

    // Validate auction timing
    if (startingTime.getTime() < Date.now()) {
        return next(new ErrorHandler("Auction start time must be greater than the present time", 400));
    }
    if (startingTime >= endingTime) {
        return next(new ErrorHandler("Auction starting time must be less than end time", 400));
    }

    // Prepare data for update
    let data = {
        startingTime,
        endingTime,
        bids: [],
        commissionCalculated: false
    };

    // Update auction
    const auctionItem = await Auction.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

    if (!auctionItem) {
        return next(new ErrorHandler("Failed to republish auction", 500));
    }

    // Update user's unpaid commission if user exists
    let createdBy = null;
    if (mongoose.Types.ObjectId.isValid(req.user._id)) {
        createdBy = await User.findByIdAndUpdate(req.user._id, { unpaidcommision: 0 }, { new: true });
    }

    res.status(200).json({
        success: true,
        message: `Auction republished and will be active on ${req.body.startingTime}`,
        auctionItem,
        createdBy
    });
});

