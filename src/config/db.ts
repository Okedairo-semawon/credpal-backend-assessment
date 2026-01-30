import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.MONGODB_URI || "";
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI!);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to the database:", error);
        process.exit(1);
    }
}

export default connectDB;