const express = require("express")
const router = express.Router()
const {check, validationResult} = require('express-validator')
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")
router.post("/signup",[
    check("name").isLength({min:3}).withMessage('name must be at least 3 chars long'),
    check("email").isEmail().withMessage('must be an email address'),
    check("password").isLength({min:5}).withMessage('password must be at least 5 chars long')
],signup)

router.post("/signin",[
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min:5}).withMessage('password is required')
],signin)

router.get("/signout",signout)
router.get("/testroute",isSignedIn,(req,res)=>{
    res.send("A protected route")
})
module.exports = router