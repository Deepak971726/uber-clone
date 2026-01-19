import { rideModel } from "../models/ride.model.js";
import { getDistanceTimeServise } from "./maps.service.js" 
import crypto from 'crypto'

const getFareService = async(pickup, destination)=>{
     if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    
    try {
        
        const distanceTime = await getDistanceTimeServise(pickup,destination)
        // console.log(distanceTime)
        
        if(!distanceTime){
            throw new Error("there is somthing went wrong while generating fare")
        }
        const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
        };
        

        const perKmRate = {
            auto: 10,
            car: 15,
            moto: 8
        };

        const perMinuteRate = {
            auto: 2,
            car: 3,
            moto: 1.5
        };
        
        const distanceMeter  = distanceTime.distance.value
        const second = distanceTime.duration.value
        
        const fare = {
            auto: Math.round(baseFare.auto + ((distanceMeter / 1000) * perKmRate.auto) + ((second / 60) * perMinuteRate.auto)),
            car: Math.round(baseFare.car + ((distanceMeter / 1000) * perKmRate.car) + ((second / 60) * perMinuteRate.car)),
            moto: Math.round(baseFare.moto + ((distanceMeter / 1000) * perKmRate.moto) + ((second / 60) * perMinuteRate.moto))
        };

    return fare;
        
    } catch (error) {
        console.log(error)
        throw new Error("something went wrong while calculating the fare")
    }
    
}

function getOtp(num) {
    
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
     
}


const createRideService = async({user, pickup, destination, vehicleType})=>{
    
   try {
     if(!user || !pickup || !destination || !vehicleType){
         throw new Error("all fields are required")
     }
     
      const fare = await getFareService(pickup, destination);
      const distanceTime = await getDistanceTimeServise(pickup,destination)
      
      
     
     // console.log(distanceTime)
      const ride = await rideModel.create({
         user,
         pickup,
         destination,
         otp: getOtp(6),
         fare: fare[vehicleType],
         distance: distanceTime.distance.value/1000
     })
     
 
     return ride;
   } catch (error) {
        console.log(error)
        throw new Error("something went wrong while creating the ride")
   }
    
    
}

const confirmRideServie = async({rideId, captain})=>{
    
    if(!rideId || !captain){
          throw new Error("all fields are required")
    }
    
    try {
        
        await rideModel.findOneAndUpdate({_id:rideId},{
            status:"accepted",
            captain:captain._id
        }) 
        
          const ride = await rideModel.findOne({
            _id: rideId
        }).populate('user').populate('captain').select('+otp');
            
        
        if(!ride){
            throw new Error("ride not found")
        }
        
        return ride
        
    } catch (error) {
         console.log(error)
        throw new Error("something went wrong while confirming the ride")
    }
}

export {createRideService, getFareService, confirmRideServie}