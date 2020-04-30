import React,{useState, useEffect} from "react"
import {loadCart,cartEmpty} from './helper/cartHelper'
import {Link} from 'react-router-dom'
import {getmeToken, processPayment} from "./helper/paymentBHelper"
import {createOrder} from "./helper/orderHelper"
import { isAuthenticated } from '../auth/helper'
import DropIn from "braintree-web-drop-in-react"

const Paymentb = ({
    products, setReload = f=>f, reload=undefined
})=>{
    const [info,setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken=(userId,token)=>{
         getmeToken(userId,token).then(info=>{
             console.log("INFO:" , info)
             console.log("Token",token)
             console.log("User",userId)
             if(info.error)
             {
                 setInfo({...info,error:info.error})
             }
             else{
                 const clientToken = info.clientToken
                 setInfo({clientToken})
             }
         })
    }

    useEffect(()=>{
      getToken(userId,token)
    },[])


    const showbtdropIn = ()=>{
        return (
            <div>
            {info.clientToken !== null && products.length>0 ?(
                <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button onClick={()=>{}}>Buy</button>
        </div>
            ):(<h1>Please Login or add something to cart</h1>)}
            </div>
        )
    }

    return (
        <div>

        <h3>TEst Braintree</h3>
        {showbtdropIn()}
        </div>
    )
}


export default Paymentb