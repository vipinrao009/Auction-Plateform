import { config } from "dotenv"
config()
import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express()

// cors is used for connecting fronted with backend
app.use(cors({
    origin:[],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)


export default app