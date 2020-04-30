import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import StripeCheckoutButton from "react-stripe-checkout"
import API from '../backend'
import {createOrder} from "./helper/orderHelper"
import UserDashBoard from "../user/UserDashBoard"
const StripeCheckout = ({
    products,
    setReload=f=>f,
    reload=undefined
})=>{


    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id


    const getFinalAmount = ()=>{
        let amount=0
        products.map((product,index)=>{
            amount=amount+product.price
        })
        return amount
    }

    const makePayment = (token)=>{
      const body ={
          token,
          products
      }
      const headers={
          'Content-Type':"application/json"
      }
      return fetch(`${API}/stripepayment`,{
          method:"POST",
          headers,
          body:JSON.stringify(body)
      }).then(response=>{
          
         // console.log("Products:",products)
        //   const orderData = {
        //     products: products,
        //     transaction_id: response.transaction.id,
        //     amount: getFinalAmount()
        // }
        // createOrder(userId,token,orderData)
          cartEmpty(()=>{
            console.log("SUCCESS..")
          })
          setReload(!reload)
          alert("Congratulations your order has been successfully placed!!")
       
          
      })
      .catch(err=>console.log(err))
    }
    const showStripeButton = ()=>{
        return isAuthenticated() ? (
            <div>
            <StripeCheckoutButton
            stripeKey={process.env.REACT_APP_KEY}
            token={makePayment}
            amount={getFinalAmount()*100}
            shippingAddress
            billingAddress
            name="Buy Tshirts"
            >
            <button className="btn btn-success">Pay with stripe</button></StripeCheckoutButton>
            
            </div>
        ) :(
            <Link to="/signin">
                <button className="btn btn-warning">Sign In</button>
            </Link>
        )
    }
    return (
        <div>
            <h3 className="text-white">StripeCheckout {getFinalAmount()}</h3>
        {showStripeButton()}
        </div>
    )

}
export default StripeCheckout