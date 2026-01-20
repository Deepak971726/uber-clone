import {Router} from 'express'
import {body, query} from 'express-validator' 
import {authCaptain, authUser} from '../midllerwares/auth.middlerware.js'
import { confirmRide, createRide, getFare, startRide } from '../controllers/ride.controller.js'



const router = Router()


router.post('/create',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    createRide
)
router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    getFare
)

router.post('/confirm-ride',authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRide
)
router.get('/start-ride',authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('userId').isMongoId().withMessage('Invalid user id'),
    query('otp').isLength({ min: 6 }).withMessage('Invalid otp address'),
    startRide
)


export default router