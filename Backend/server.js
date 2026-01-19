import dotenv from "dotenv";
import { app } from "./app.js";
import http from 'http'
import { initializeSocket } from "./socket.js";
dotenv.config({path:'./.env'})

const port = process.env.PORT || 3000



const server = http.createServer(app)


initializeSocket(server)

server.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
