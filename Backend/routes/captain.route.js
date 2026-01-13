import { Router } from "express";
import { body } from "express-validator";
import { authCaptain } from "../midllerwares/auth.middlerware.js";
import { getCaptainProfile, loginCaption, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";

const router = Router()


router.post('/register',[
    body("fullName.firstName")
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters"),

    body("fullName.lastName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters"),
    
    body("email")
    .isEmail().withMessage("Invalid email"),
    
    body("vehicle.color")
    .notEmpty().withMessage("Vehicle color is required")
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 characters long"),

  // plate
     body("vehicle.plate")
    .notEmpty().withMessage("Vehicle plate is required")
    .isLength({ min: 3 })
    .withMessage("Plate must be at least 3 characters long"),

  // capacity
     body("vehicle.capacity")
    .notEmpty().withMessage("Vehicle capacity is required")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  // vehicleType
    body("vehicle.vehicleType")
    .notEmpty().withMessage("Vehicle type is required")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Vehicle type must be car, motorcycle, or auto"),

     body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters")
],registerCaptain)


router.post('/login',[
     body("email")
    .isEmail().withMessage("Invalid email"),

    body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters")
],loginCaption)


router.post('/logout',authCaptain,logoutCaptain)

router.get('/get-captain-profile',authCaptain,getCaptainProfile)

export default router

