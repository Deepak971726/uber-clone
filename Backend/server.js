import dotenv from "dotenv";
import { app } from "./app.js";
import http from 'http'
dotenv.config({path:'./.env'})

const port = process.env.PORT || 3000



const server = http.createServer(app)

server.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})