import express from "express"
import { Login, Register } from "../controller/authController.js"


const authRoute = express.Router()

authRoute.post("/login",Login )                              
authRoute.post("/register",Register )                              

export default authRoute