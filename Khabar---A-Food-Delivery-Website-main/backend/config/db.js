 import mongoose from "mongoose";

 export const connectDB = async () =>{
     await mongoose.connect('mongodb+srv://Faisal049:01670129927Ff!@cluster0.ctma2nj.mongodb.net/delivery')
     .then(()=>console.log("DB Connected"))
     .catch(err => console.log("DB Connection Error:", err));

 } 