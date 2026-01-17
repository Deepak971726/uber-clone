import {getAddressCoordinate, getAutoCompleteSuggestions, getDistanceTimeServise} from '../service/maps.service.js'
import { validationResult } from 'express-validator'


const getCoordinate = async(req,res)=>{
    // console.log("me cha rha hu get coordinate")
    const errors = validationResult(req)
    if(!errors){
        return res.status(400).json({
            message:"please provide valid address",
            errors:errors.array()
        })
    }
    
    try {
        const {address} = req.query
        // console.log(address)
        
        if(!address.trim()){
            return res.status(401).json({
                message:"address is not valid"
            })
        }
        
        const coordinates = await getAddressCoordinate(address)
        // console.log("map controller me hu",coordinates)
        if(!coordinates){
            return res.status(404).json({
                message:"coordinate not found"
            })
        }
        
        return res.status(200).json({
            coordinates,
            message:"Coordinate fetch successfully!!!"
        })
        
    } catch (error) {
        console.log("something went wront in getCoordinate function",error)
        res.status(404).json({
            message:"coordinate not found"
        })
    }
}

const getDistanceTime = async(req,res)=>{
     const errors = validationResult(req)
    if(!errors){
        return res.status(400).json({
            message:"please provide valid address",
            errors:errors.array()
        })
    }
    
    try {
        const {origin, destination} = req.query
        if(!origin || !destination){
             throw new Error("all fields are required")
        }
        
        const response = await getDistanceTimeServise(origin,destination)
        
        if(!response){
            return res.status(401).json({
                message:"there is not route"
            })
        }
        
        return res.status(200).json({
            response,
            message:"route found successfully!!!"
        })
        
        
        
        
    } catch (error) {
        console.log("something went wrong",error)
        res.status(404).json({
            message:"no route found"
        })
    }
}

const getSuggestions = async(req,res)=>{
     const errors = validationResult(req)
    if(!errors){
        return res.status(400).json({
            message:"please provide valid address",
            errors:errors.array()
        })
    }
    // console.log("meeeee bhi")
    
    try {
        
        const {input} = req.query
        if(!input){
            return res.status(401).json({message:"all fields are required"})
        }
        
        const data = await getAutoCompleteSuggestions(input)
        // console.log("dskjfjjsdfnj",data)
        
        if(!data){
            return res.status(401).json({
                message:"suggestions not found"
            })
        }
        
        return res.status(200).json({
            data,
            message:"suggestion fetch successfully!!!"
        });
        
        
        
        
    } catch (error) {
        console.log("something went wrong",error)
        res.status(404).json({
            message:"no suggestions found"
        })
    }
    
}

export {getCoordinate, getDistanceTime, getSuggestions}