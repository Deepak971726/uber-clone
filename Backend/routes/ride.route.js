import {Router} from 'express'
import {body} from 'express-validator' 
import {authUser} from '../midllerwares/auth.middlerware.js'
import { createRide } from '../controllers/ride.controller.js'



const router = Router()


router.post('/create',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    authUser,
    createRide
)


export default router