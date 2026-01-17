import {validationResult} from 'express-validator'
import { createRideService } from '../service/ride.service.js';
 
 const createRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {pickup, destination, vehicleType} = req.body
    
    try {
        
        // console.log("me chaaaasjdfjdsfjk")
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        console.log(ride)
        
        if(!ride){
            return res.status(501).json({
                message:"create of ride failed"
            })
        }
        
        
        return res.status(201).json({
            ride,
            message:"ride created successfully"
        });
        
        
    } catch (error) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
 }
 
 
 export {createRide}