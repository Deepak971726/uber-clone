import {validationResult} from 'express-validator'
import { confirmRideServie, createRideService, getFareService } from '../service/ride.service.js';
import { getAddressCoordinate, getCaptainInTheRadius } from '../service/maps.service.js';
import { sendMessageToSocketId } from '../socket.js';
import { rideModel } from '../models/ride.model.js';
 
 const createRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {pickup, destination, vehicleType} = req.body
    
    try {
        
        // console.log("me chaaaasjdfjdsfjk")
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        // console.log(ride)
        
        if(!ride){
            return res.status(501).json({
                message:"create of ride failed"
            })
        }
        
        
        res.status(200).json({
            ride,
            message:"ride created successfully"
        });
        
        const pickupCoordinates = await getAddressCoordinate(pickup)
        // console.log("object",pickupCoordinates)
        const captainsInRadius = await getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng,2)
        // console.log("captainradius",captainsInRadius)
        ride.otp=""
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        
        // console.log(pickupCoordinates)
        captainsInRadius.map(captainsss => {

            sendMessageToSocketId(captainsss.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
 }
 
 
 const getFare=async(req,res)=>{
     const errors = validationResult(req);
    //  console.log(errors)
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
         console.log("get fare",error);
        return res.status(500).json({ message: error.message });
    }
    
 }
 
 const confirmRide = async(req,res)=>{
    // console.log("me cha rha hu")
     const errors = validationResult(req);
    //  console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
     const { rideId } = req.body;
     console.log(rideId)
    try {
        
        // console.log("me toh chal rhai")
        const ride = await confirmRideServie({rideId, captain:req.captain})
        
        console.log(ride)
        if(!ride){
            return res.status(404).json({
                message:"ride not found"
            })
        }
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        
        return res.status(200).json({
            // message:"ride confirmed successfully",
            ride
        })
        
        
    } catch (error) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
    
 }

 
 export {createRide, getFare, confirmRide}