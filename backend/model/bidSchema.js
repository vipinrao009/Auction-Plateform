import {model,Schema} from "mongoose"

const bidSchema = new Schema({
    amount: Number,
    bidder: {
        id:{
            type : Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        userName:String,
        profileImage:String,
    },
    auction: {
        id: {
            type:Schema.Types.ObjectId,
            ref:"Auction",
            required:true
        }
    }
})

export const Bid = model("Bid",bidSchema)