import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"
import BlacklistToken from "../models/blacklistToken.model.js"
import { captainModel } from "../models/captain.model.js";

const authUser= async(req,res,next)=>{
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    
    if(!token){
       return res.status(401).json({
            message:"Unauthorized"
        })
    }
    
    const blacklistToken = await BlacklistToken.findOne({token})
    console.log("blaccklist", blacklistToken)
    if(blacklistToken){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    
    
   try {
     
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRETE)
        const user = await userModel.findById(decodedToken._id)
        
        if(!user){
            
           return res.status(401).json({
                message:"Unauthorized"
            })
        }
        
        req.user = user
        
        return next()
        
        
     
     
   } catch (error) {
    console.log("jwt verification get failed", error)
   }  
}



const authCaptain= async(req,res,next)=>{
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    
    if(!token){
       return res.status(401).json({
            message:"Unauthorized"
        })
    }
    
    const blacklistToken = await BlacklistToken.findOne({token})
    
    if(blacklistToken){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    
    
   try {
     
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRETE)
        const captain = await captainModel.findById(decodedToken._id)
        
        if(!captain){
            
           return res.status(401).json({
                message:"Unauthorized"
            })
        }
        
        req.captain = captain
        
        return next()
        
        
     
     
   } catch (error) {
    console.log("jwt verification get failed", error)
   }  
}






export {authUser, authCaptain};