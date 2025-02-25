import {model, Schema} from "mongoose"

const auctionSchema = new Schema({
    title:String,

    description:String,

    category:String,

    condition:{type:String, enum: ["New","Used"]},

    startingBid:Number,

    currentBid:{ type : Number, default:0},

    startingTime:String,

    endingTime:String,

    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bids: [
        {
            userId:{
                type:Schema.Types.ObjectId,
                ref:"Bid"
            },
            userName:String,
            profileImage:String,
            amount:Number
        }
    ],
    highestBidder: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    commissionCalculated:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Auction = model("Auction",auctionSchema)