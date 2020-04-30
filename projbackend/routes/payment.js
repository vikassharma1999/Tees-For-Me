const express = require("express")
const router = express.Router()
const {getToken, processPayment} = require("../controllers/payment")
const {isSignedIn, isAuthenticated} = require("../controllers/auth")

router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken)
router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment)

module.exports = router