import express from "express"

import cors from 'cors'

// dotenv.config({path:'./.env'})
const app = express()

app.use(cors())

app.get('/',(req,res)=>{
    res.send("hellow workd")
})

export {app}