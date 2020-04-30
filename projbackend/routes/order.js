const express = require("express")
const router = express.Router()

const {getUserById,pushOrderInPurchaseList } = require("../controllers/user")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {updateStock} = require("../controllers/product")
const {getOrderById,createOrder,getAllOrders,getStatus,updateStatus} = require("../controllers/order")

//param
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//Routes

//create
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)


//read
router.get("/order/All/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)

// status of order
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)
module.exports = router