import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'

import multer from 'multer'
// import path from 'path'

const foodRouter = express.Router();


// Image storage engine - using memory storage for Cloudinary upload
const storage = multer.memoryStorage();

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);





export default foodRouter;






// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.resolve("uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
