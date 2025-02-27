
// export const calculateCommission = async (auctionId) => {
//   const auction = await Auction.findById(auctionId);
//   if (!mongoose.Types.ObjectId.isValid(auctionId)) {
//     return next(new ErrorHandler("Invalid Auction Id format.", 400));
//   }
//   const commissionRate = 0.05;
//   const commission = auction.currentBid * commissionRate;
//   return commission;
// };

import AsyncHandler from "../middleware/AsyncHandler.js";
import ErrorHandler from "../middleware/error.js";
import { PaymentProof } from "../model/commissionProofSchema.js";
import { User } from "../model/userSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const proofOfCommission = AsyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Payment Proof Screenshot required.", 400));
  }
  const { proof } = req.files;
  const { amount, comment } = req.body;
  const user = await User.findById(req.user._id);

  if (!amount || !comment) {
    return next(
      new ErrorHandler("Ammount & comment are required fields.", 400)
    );
  }

  if (user.unpaidcommision === 0) {
    return res.status(200).json({
      success: true,
      message: "You don't have any unpaid commissions.",
    });
  }

  if (user.unpaidcommision < amount) {
    return next(
      new ErrorHandler(
        `The amount exceeds your unpaid commission balance. Please enter an amount up to ${user.unpaidcommision}`,
        403
      )
    );
  }

    const avatar = await uploadOnCloudinary(proof.tempFilePath)
    if(!avatar){
        return next(new ErrorHandler("Payment Proof Screenshot failed to upload on cloudinary !!!",400))
    }

  const commissionProof = await PaymentProof.create({
    userId: req.user._id,
    proof: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
    amount,
    comment,
  });
  res.status(201).json({
    success: true,
    message: "Your proof has been submitted successfully. We will review it and responed to you within 24 hours.",
    commissionProof,
  });
});
