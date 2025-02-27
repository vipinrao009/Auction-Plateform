import { model, Schema } from "mongoose";

const paymentProofSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proof: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Approved", "Rejected", "Settled"],
  },
  amount: Number,
  comment: String,
});

export const PaymentProof = model("PaymentProof", paymentProofSchema);