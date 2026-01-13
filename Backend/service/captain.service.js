import { captainModel } from "../models/captain.model.js";

 


const createCaptain = async({fullName, email, hashedPassword, vehicle})=>{
    
  try {
        console.log(fullName.firstName, fullName.lastName, email, hashedPassword, vehicle)
        if (!fullName.firstName || !email || !hashedPassword || !vehicle) {
              throw new Error('All fields are required');
        }
      const captain = await captainModel.create({
          fullName,
          email,
          password:hashedPassword,
          vehicle
          
      })
      
      return captain
  } catch (error) {
    console.log("something went wrong when create a captain from servicce",error)
  }
}

export default createCaptain;