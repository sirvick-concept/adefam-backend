import express from "express"
import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Login =async(req, res) =>{
    try {
        const {email,password} = req.body
    if(!email){
        return res.status(404).send({
            success : false,
            message : "email is required"
        })
    }
    if(!password){
        return res.status(404).send({
            success : false,
            message : "password is required"
        })
    }

    const user = await User.findOne({email})
    if(!user){
         return res.status(404).send({
            success : false,
            message : "user not found"
        })
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
        return res.status(404).send({
            success : false,
            message : "incorrect password"
        })
    }
    
    const JWT_SECRET = process.env.JWT_SECRET
    const token = await jwt.sign({id:user._id},JWT_SECRET,{expiresIn : "7D"})
    console.log(token);
    res.cookie('adefam', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // Expires after 7 days minutes (in milliseconds)
        httpOnly: true,  // Protects against XSS attacks
        sameSite : "lax",
        secure : false
    });

    console.log(user,token);
    
    return res.status(200).send({
            success : true,
            message : "login successfull",
            data : {
                _id : user._id,
                name : user.name,
                email : user.email,
                createdAt : user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        console.log(error);
        
    }
    
}



export const Register = async(req, res) =>{
    try {
        const {name, email,password} = req.body
    if(!name){
        return res.status(404).send({
            success : false,
            message : "name is required"
        })
    }
    if(!email){
        return res.status(404).send({
            success : false,
            message : "email is required"
        })
    }
    if(!password){
        return res.status(404).send({
            success : false,
            message : "password is required"
        })
    }

    const alreadyExist = await User.findOne({email})
    if(alreadyExist){
        return res.status(404).send({
            success : false,
            message : "user already exist"
        })
    }

    
    const hashPassword = await bcrypt.hash(password,10)

    // const user = await User.create({
    //     name,
    //     email,
    //     password : hashPassword
    // })
    const user = await User({
        name,
        email,
        password: hashPassword
    }).save()

    if(user){
        console.log(user);
        
        return res.status(201).send({
            success : true,
            message : "user registered successfully"
        })
    }else{
        return res.status(404).send({
            success : false,
            message : "error when registering user"
        })
    }
    } catch (error) {
        console.log(error);
    }
}