import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { body } from "express-validator";
import {authUser} from "../midllerwares/auth.middlerware.js";


const router = Router()

router.post('/register',[
    body("firstName")
    .isLength({min:3})
    .notEmpty().withMessage("Name must be at least 3 characters"),

    body("email")
    .isEmail().withMessage("Invalid email"),

    body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters")
],registerUser)



router.post('/login',[
    body("email")
    .isEmail().withMessage("Invalid email"),

    body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters")
],loginUser)


router.post('/logout',authUser,logoutUser)

router.get('/get-user-profile',authUser,getUserProfile)


export default router