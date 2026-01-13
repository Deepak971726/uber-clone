import { validationResult } from "express-validator"
import { captainModel } from "../models/captain.model.js";
import createCaptain from "../service/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

const registerCaptain=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({
            errors: errors.array()
        });
    }
    
    try {
        const {fullName, email, password, vehicle} = req.body
        
        const captainExisted = await captainModel.findOne({email})
        if(captainExisted){
            return res.status(401).json({
                message:"captain already existed"
            })
        }
        
        const hashedPassword = await captainModel.hashPassword(password)
        const captain = await createCaptain({fullName, email, hashedPassword, vehicle})
        
        return res.status(200).json({
            captain,
            message:"captain registred successfully"
        })
        
    } catch (error) {
        console.log("something went wrong while registering captain",error)   
    }
    
    
    
    
    
    
     
}

const loginCaption=async(req,res)=>{
    const {email, password} = req.body
     const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
        errors: errors.array()
        });
    }
    // console.log(email, password)
    
    try {
        
        const captain = await captainModel.findOne({email}).select("+password")
        if(!captain){
           return res.status(401).json({
                message:"user doesn't existed"
            })
        }
        // console.log(user.password)
        const isValidPassword = await captain.comparePassword(password)
        if(!isValidPassword){
            return res.status(401).json({
                message:"password or email is not valid"
            })
        }
        
        const token = captain.generateAuthToken()
        res.cookie('token',token)
        
        return res.status(200).json({
            captain,
            token
        })
        
        
        
    } catch (error) {
        console.log("something went wrong when login user",error)
    }
    
    
}

const logoutCaptain=async(req,res)=>{
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

const getCaptainProfile=async(req,res)=>{
     const captain =await captainModel.findById(req.captain._id)
    res.status(200).json({
        captain,
        message:"user details feched successfully !!"
    })
}

export {registerCaptain,loginCaption,logoutCaptain,getCaptainProfile}