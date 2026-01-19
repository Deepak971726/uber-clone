import axios from 'axios'
import { captainModel } from '../models/captain.model.js'
const getAddressCoordinate =async(address)=>{
    try {
        // console.log("me toh chal rha hu")
        
        const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
            params:{
                address,
                key: process.env.GOOGLE_MAPS_API
            } 
        })
        // console.log(res.data.results[0].geometry.location)
        if(res.data.status!=='OK'){
            throw new Error("Unable to fetch location from google map API")
        }
        const location = res.data.results[0].geometry.location
        console.log("locaiton hai jo api se aaya hai",location)
        
        if(!location){
            throw new Error("address in not valid")
        }
        
        return {
            ltd:location.lat,
            lng:location.lng
        }
        
    } catch (error) {
        console.log("something went wrong while hiting google map AIP")
        res.status(500).json({
            message:"internal server error"
        })
    }
}

const getDistanceTimeServise = async(origin, destination)=>{
    
    if(!origin || !destination){
        throw new Error("all fields are required")
    }
    try {
        
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API}`;
        const res = await axios(url)
        
        if(res.data.status!=='OK'){
            throw new Error("something went wrong in API fetching...Unable to fetch distance and time")
            
        }
        if (res.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
            throw new Error('No routes found');
        }
        // console.log(res.data.rows[0])
        return res.data.rows[ 0 ].elements[ 0 ]
        

        
    } catch (error) {
        console.log("something went wrong in service function",err);
        throw err;
    }
}


const getAutoCompleteSuggestions =async(input)=>{
    if(!input){
        throw new Error("all fields are required")
    }
    
    try {
        
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.GOOGLE_MAPS_API}`
        const response = await axios(url)
        
        if(!response || response.data.status!=='OK'){
            throw new Error('Unable to fetch suggestions');
        }
        // console.log(response.data.predictions)
        

        
        return response.data.predictions.map((prediction) => prediction.description).filter((value) => value);
        
        
    } catch (error) {
        console.log("something went wrong in service function",err);
        throw err;
    }
}

const getCaptainInTheRadius = async(ltd, lng, radius)=>{
    
    if(!ltd || !lng || !radius){
        throw new Error("all fileds are required from getCaptainsInTheRadius")
    }
    // radius in KM
    console.log("if there is any other value then choose that")
     const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
}



export {getAddressCoordinate ,getDistanceTimeServise, getAutoCompleteSuggestions, getCaptainInTheRadius}