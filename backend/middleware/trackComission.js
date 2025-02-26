import { User } from "../model/userSchema.js";
import AsyncHandler from "./AsyncHandler.js";
import ErrorHandler from "./error.js";

export const trackCommissionStatus = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }
    if (user.unpaidcommision > 0) {
        return next(new ErrorHandler("You have unpaid commission. Please pay before posting a new auction", 400));
    }
    next();
});
