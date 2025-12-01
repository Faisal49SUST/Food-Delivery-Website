import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



//app configuration
const app = express()
const port = process.env.PORT || 4000;

//middleware 
app.use(express.json())
app.use(cors())

//DB connection 
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http//localhost:${port}`)
})

//app.listen(4000, () => console.log("Server running on port 4000"));

