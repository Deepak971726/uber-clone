import {validationResult} from 'express-validator'
import { createRideService, getFareService } from '../service/ride.service.js';
 
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
 
 
 const getFare=async(req,res)=>{
     const errors = validationResult(req);
     console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log("running..........")
    // console.log(req.body)
    
    const {pickup, destination} = req.query
    // console.log(pickup, destination, vehicleType)
    try {
        
        if(!pickup || !destination){
            return res.status(400).json({ 
                message:"all fields are required"
            });
        }
        
        const fare = await getFareService(pickup, destination)
        // console.log("fare............",fare)
        if(!fare){
            return res.status(401).json({
                message:"fare does not calculated"
            })
        }
        
        return res.status(200).json({
           fare,
            message:"fare calculated successfully!!!"
        })
        
        
    } catch (error) {
        
    }
    
 }

 
 export {createRide, getFare}