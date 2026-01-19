import {Router} from 'express'
import {body, query} from 'express-validator' 
import {authCaptain, authUser} from '../midllerwares/auth.middlerware.js'
import { confirmRide, createRide, getFare } from '../controllers/ride.controller.js'



const router = Router()


router.post('/create',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    authUser,
    createRide
)
router.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    authUser,
    getFare
)

router.post('/confirm-ride',authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRide
)


export default router