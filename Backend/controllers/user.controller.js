import { validationResult } from "express-validator"
import userModel from "../models/user.model.js";
import createUser from "../service/user.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";


const registerUser = async(req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
        errors: errors.array()
        });
    }
    
    const {firstName, lastName, email, password} = req.body
    
    try {
        const isAlreadyUser = await userModel.findOne({email})
        if(isAlreadyUser){
            return res.status(400).json({message:"user is already existed"})
        }
        //  console.log("me toh chal rha", firstName,lastName,email,password)
        
        const hashedPassword = await userModel.hashPassword(password)
        // console.log(hashedPassword)
        
        const user = await createUser(
                
                {firstName,
                lastName,
                email,
                password:hashedPassword}
        )
        
        const token = user.generateAuthToken()
        
       return res.status(200).json({
            user,
            token
        })
        
    } catch (error) {
        console.log("somewent work while registering a user",error)
    }
    
}


const loginUser = async (req,res)=>{
    
    const {email, password} = req.body
     const errors = validationResult(req);
     
    //  console.log("me ccha rha hu")

    if (!errors.isEmpty()) {
        return res.status(400).json({
        errors: errors.array()
        });
    }
    // console.log(email, password)
    
    try {
        
        const user = await userModel.findOne({email}).select("+password")
        if(!user){
           return res.status(401).json({
                message:"user doesn't existed"
            })
        }
        // console.log(user.password)
        const isValidPassword = await user.comparePassword(password)
        if(!isValidPassword){
            return res.status(401).json({
                message:"password or email is not valid"
            })
        }
        
        const token = user.generateAuthToken()
        res.cookie('token',token)
        
        return res.status(200).json({
            user,
            token
        })
        
        
        
    } catch (error) {
        console.log("something went wrong when login user",error)
    }
    
    
    
    // if()
}


const logoutUser = async(req,res)=>{
    
     try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
        
        await BlacklistToken.create({token})
        res.clearCookie('token')
        return res.status(200).json({
           message:"user logout successfully!!!"
        })
     } catch (error) {
        console.log("somethong went wrong when logging out the user", error)
     }
}


const getUserProfile = async(req,res)=>{
    
    const user =await userModel.findById(req.user._id)
    res.status(200).json({
        user,
        message:"user details feched successfully !!"
    })
}


export {registerUser, loginUser, logoutUser, getUserProfile}