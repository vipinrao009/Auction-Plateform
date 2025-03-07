import { config } from "dotenv"
config()
import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./router/userRouter.js"
import auctionRouter from "./router/auctionRouter.js"
import bidRouter from "./router/bidRouter.js"
import commissionRouter from "./router/commissionRouter.js"
const app = express()

// cors is used for connecting fronted with backend
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)
app.use("/api/v1/user/",userRouter)
app.use("/api/v1/auction/",auctionRouter)
app.use("/api/v1/bid/",bidRouter)
app.use("/api/v1/commission/",commissionRouter)
app.use(ErrorMiddleware)

export default app