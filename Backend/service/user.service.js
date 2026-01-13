import userModel from "../models/user.model.js";


const createUser = async({firstName, lastName, email, password})=>{
    
  try {
        if (!firstName || !email || !password) {
              throw new Error('All fields are required');
        }
      const user = await userModel.create({
          fullName:{
              firstName,
              lastName,
          },
          email,
          password
          
      })
      
      return user
  } catch (error) {
    console.log("something went wrong when create a user from servicce",error)
  }
}

export default createUser;