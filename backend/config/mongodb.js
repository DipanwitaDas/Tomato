import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://dipanwitadas2442004:7047455197@cluster0.tjocx.mongodb.net/food-del').then(()=>console.log("MongoDB connected"));
}