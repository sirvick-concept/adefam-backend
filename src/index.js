import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./route/authRoute.js";
import connectDB from "./connect/connectDB.js";

dotenv.config()
const app = express()
await connectDB()

app.use(cors({
    origin : ["https://adefarm.vercel.app", "http://localhost:5173"],
    credentials : true
}));
app.use(cookieParser())
app.use(express.json({
    limit:"10MB"
}))

app.use("/api",authRoute)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`we are on port ${PORT}`);
})

