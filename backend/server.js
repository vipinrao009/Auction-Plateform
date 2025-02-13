import app from "./app.js";
import cloudinary from "cloudinary"

const PORT = process.env.PORT

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

app.listen(()=>{
    console.log(`Server is running on ${PORT}`)
})