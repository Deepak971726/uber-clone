import express from "express"
import cors from 'cors'
import { connectToDB } from "./db/db.js"
import cookieParser from "cookie-parser"



// dotenv.config({path:'./.env'})
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

connectToDB()


app.get('/',(req,res)=>{
    res.send("hellow workd")
})


// routes will declare here
import userRouter from './routes/users.route.js'
import captainRouter from './routes/captain.route.js'
import mapsRouter from './routes/maps.route.js'
import riderouter from "./routes/ride.route.js"


app.use('/api/v1/users',userRouter)
app.use('/api/v1/captain',captainRouter)
app.use('/api/v1/maps',mapsRouter)
app.use('/api/v1/ride',riderouter)

export {app}