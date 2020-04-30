const express = require("express")
const router = express.Router()

const {getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const {getUserById } = require("../controllers/user")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")

//param
router.param("productId",getProductById)
router.param("userId",getUserById)

//Routers

//Create
router.post("/product/create/:userId",isSignedIn, isAuthenticated,isAdmin,createProduct)

//Read
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//Update
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
)

//Delete
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
)

router.get("/products",getAllProducts)
router.get("/products/categories,getAllUniqueCategories")
module.exports = router