import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    
    fullName:{
        
        firstName:{
            type:String,
            required:true,
            minlenght:[3,"First name must be altest 3 character long"]
        },
        lastName:{
            
            type:String,
            minlenght:[3,"First name must be altest 3 character long"]
        }
    },
    
    email:{
        type:String,
        required:true,
        minlenght:[3,"First name must be altest 3 character long"],
        unique:true
    },
    
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }
    
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {
        _id:this._id
        }, 
        process.env.TOKEN_SECRETE, 
        {expiresIn:'24h'}
    )
    
    return token
}

userSchema.methods.comparePassword = async function(hashPassword){
    return await bcrypt.compare(hashPassword,this.password)
    
}

userSchema.statics.hashPassword = async function(password){
    
    const hashPassword = await bcrypt.hash(password,10)
    return hashPassword
}





const userModel = mongoose.model('user',userSchema)
export default userModel