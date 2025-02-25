import jwt from "jsonwebtoken"
import AsyncHandler from "./AsyncHandler.js"
import ErrorHandler from "./error.js"
import { User } from "../model/userSchema.js"


export const isAuthenticated = AsyncHandler(async(req,res,next)=>{
    const token = req.cookies?.token

    if(!token){
        return next(new ErrorHandler("User not authenticated",400))
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decodedToken){
        return next(new ErrorHandler("Invalid JWT token"))
    }
    
    req.user = await User.findById(decodedToken?._id)
    next()
})

export const isAuthorized = (...roles)=>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} not allowed to access this resource`,403))
        }
        next()
    }
}