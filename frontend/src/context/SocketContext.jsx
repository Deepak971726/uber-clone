import { createContext, useContext, useEffect } from "react";
import {io} from 'socket.io-client'


export const SocketContext = createContext(null)

const socket = io('http://localhost:5000')


export const SocketContextProvider = ({children})=>{
    
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("connect to socket server")
        })
        
        
        socket.on('disconnect',()=>{
            console.log("disconnected to socket server")
        })
    })
    
    return <SocketContext.Provider value={{socket}}>
                {children}
    </SocketContext.Provider>
}

export const useSocket = ()=>{
    return useContext(SocketContext)
}
