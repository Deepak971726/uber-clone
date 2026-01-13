import mongoose from "mongoose";


const connectToDB = async ()=>{
        try {
            const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECT}/uber`)
            console.log(`MongoDB connected || DB: Host ${connectionInstance.connection.host}`)
        } catch (error) {
            console.log("MongoDB connection failed ", error)
            process.exit(1)
        }
}

export {connectToDB}