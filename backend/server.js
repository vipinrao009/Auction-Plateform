import app from "./app.js";
import cloudinary from "cloudinary"
import connectToDB from "./config/db.connection.js";

const PORT = process.env.PORT

connectToDB()
  .then(() => {
    app.listen(PORT || 7000, () => {
      console.log(`Server is runnig at http://localhost:${PORT}`);
    });
  })

  .catch((e) => {
    console.log("MongoDB connection failed!!!");
  });

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})
