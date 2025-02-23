import AsyncHandler from "../middleware/AsyncHandler.js";
import ErrorHandler from "../middleware/error.js"
import { User } from "../model/userSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateToken } from "../utils/jwtToken.js";

export const register = AsyncHandler(async(req,res,next)=>{
    if(!req.files ||Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Profile image required !!!", 400))
    }

    const { profileImage } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    
    if (!allowedFormats.includes(profileImage.mimetype)) {
        return next(new ErrorHandler("File format not supported.", 400));
    }
    

    const {userName,password,email,phone,address,role,bankAccountNumber,bankAccountName,bankName,upiId,paypalEmail} = req.body

    if(!userName || !password || !email || !phone || !address || !role){
        return next(new ErrorHandler("Please provide full details",400))
    }
    if (role === "Auctioneer") {
        if (!bankAccountName?.trim() || !bankAccountNumber?.trim() || !bankName?.trim()) {
            return next(new ErrorHandler("Please provide full bank details", 400));
        }
        if (!upiId?.trim()) {
            return next(new ErrorHandler("Please provide upi ID.", 400));
        }
        if (!paypalEmail?.trim()) {
            return next(new ErrorHandler("Please provide PayPal email.", 400));
        }
    }

    const isRegistered = await User.find({email});
    if(!isRegistered){
        return next(new ErrorHandler("User already registered",400))
    }

    const avatar = await uploadOnCloudinary(profileImage.tempFilePath)
    if(!avatar){
        return next(new ErrorHandler("Upload failed on cloudinary !!!",400))
    }

    const user = await User.create({
        userName,
        password,
        address,
        email,
        phone,
        role,
        profileImage:{
            public_id:avatar.public_id,
            url:avatar.secure_url
        },
        paymentMethod:{
            bankTransfer:{
                bankAccountNumber,
                bankAccountName,
                bankName
            },
            upi:{
                upiId
            },
            paypal:{
                paypalEmail
            }
        }
    })

    generateToken(user, "User registered successfully", 200, res)
});