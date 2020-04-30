import React, {useState, useEffect} from 'react'
import API from '../backend'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckout'
import Paymentb from "./Paymentb"

const Cart = ()=>{
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
    
    
    useEffect(()=>{
      setProducts(loadCart())
    },[reload])
    const loadAllProducts = (products) =>{
        return(
        <div>
            <h1>This section is to load products</h1>
             {products.map((product,index)=>{
                    return(
        <Card
        key={index}
        product={product}
        addToCart={false}
        removeFromCart={true}
        setReload={setReload}
        reload={reload}
        />)

    })}
</div>
        )
    }
    const loadCheckout =()=>{
        return (
            <div>
               <StripeCheckout
               products={products}
               setReload={setReload}
               reload={reload}
               />
            </div>
        )
    }

    return(
        <Base title="Cart page" description="ready to checkout">
            <div className="row text-center">
               <div className="col-6">
                {products.length>0 ? loadAllProducts(products) : (<h3>No  product in the cart</h3>)}
               </div>
               <div className="col-6">
                 {loadCheckout()}
               </div>
            </div>
        </Base>
    )
}
export default Cart