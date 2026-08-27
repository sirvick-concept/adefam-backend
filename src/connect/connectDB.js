import mongoose from "mongoose";

const connectDB = async()=>{
const connecting = await mongoose.connect(process.env.MONGODB)
const connected = await connecting.connection.host
console.log(connected);

}

export default connectDB