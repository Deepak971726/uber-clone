import {Server} from 'socket.io'
import userModel from './models/user.model.js';
import { captainModel } from './models/captain.model.js';


let io;
const initializeSocket=(server)=>{
    
    io =  new Server(server, {cors:{origin:'*',mothods:['GET','POST']}})
    
    io.on('connection',(socket)=>{
        console.log('client connected:',socket.id)
        
        socket.on('join',async(data)=>{
            const {userId, userType} = data
            // console.log(data)
            if(userType==='user'){
                await userModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }
            else if(userType==='captain'){
               const cap = await captainModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
                // console.log("intialia connection of captain socket",cap)
            }
        })
        
        socket.on('update-location-captain', async(data)=>{
            const {userId, location} = data;
            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', {message:"Invalid location data"})
            }
            await captainModel.findByIdAndUpdate(userId,{
                location:{
                    ltd:location.ltd,
                    lng:location.lng
                }
            })
        })
        
        socket.on('disconnect',()=>{
            console.log(`client disconnected: ${socket.id}`)
        })
    })
        
}

const sendMessageToSocketId = (socketId, messageObject)=>{
    if(io){
        console.log(socketId)
        console.log("me cha hu this send message socket")
    console.log(messageObject)
        io.to(socketId).emit(messageObject.event, messageObject.data)
        
    }
    else{
        console.log("socket.io not initialized")
    }
}

export {initializeSocket, sendMessageToSocketId}