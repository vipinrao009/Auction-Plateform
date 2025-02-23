import { model,Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    userName: {
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        minLength:[3,"Username must conatain atleast 3 characters."],
        maxLength:[40,"Username can't exceed 40 characters."]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Username must conatain atleast 8 characters."],
    },
    email:{
        type:String,
    },
    address:{
        type:String
    },
    phone:{
        type:String,
        selected:false,
        minLength:[10,"Phone number must conatin exact 10 digits."],
        maxLength:[10,"Phone number must conatin exact 10 digits."]
    },
    profileImage:{
        public_id:{
         type:String,
         required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    paymentMethod:{
        bankTransfer:{
            bankAccountNumber:String,
            bankAccountName:String,
            bankName: String
        },
        upi:{
            upiId:String
        },
        paypal:{
            paypalEmail: String
        }
    },
    role:{
        type:String,
        enum:["Auctioneer","Bidder","Super Admin"],
    },
    unpaidcommision: {
        type:Number,
        default:0
    },
    auctionWon:{
        type:Number,
        default:0
    },
    moneySpent:{
        type:Number,
        default:0
    },
    createdAt: {
        type:String,
        default:Date.now
    }
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);  // No need for 'await' return
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

export const User = model("User",userSchema);
