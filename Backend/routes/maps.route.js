import {Router} from 'express'
import { authUser } from '../midllerwares/auth.middlerware.js'
import { getCoordinate, getDistanceTime, getSuggestions } from '../controllers/map.controller.js'
import {query} from 'express-validator'

const router = Router()

router.get('/get-coordinates',
            query('address').isString().isLength({ min: 3 }),
            authUser,getCoordinate)
router.get('/get-destance',
     query('origin').isString().isLength({ min: 3 }),
     query('destination').isString().isLength({ min: 3 }),
     authUser,
     getDistanceTime
)

router.get('/get-suggestions',
     query('input').isString().isLength({ min: 3 }),
     authUser,
     getSuggestions
     
)

export default router

