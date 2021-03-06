import React, { useEffect, useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const Card = ({product,
  addToCart = true,
  removeFromCart = false,
  setReload=f=>f,
  reload=undefined

}) => {
  
  
  const productTitle = product ? product.name : "A photo from Google"
  const productDesc = product ? product.description : "It is a cool pic"
  const productPrice = product ? product.price : "5"

  const [redirect,setRedirect] = useState(false)
  const [count,setCount] = useState(product.count)
  const getARedirect=(redirect)=>{
    if(redirect)
    {
      return <Redirect to="/cart"/>
    }
  }

const AddToCart = ()=>{
  addItemToCart(product,()=>setRedirect(true))
} 




  const showAddToCart = (addToCart)=>{
    return (
      addToCart && (
             <button
                onClick={AddToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
      )
    )

  }

  const showRemoveFromCart=(removeFromCart)=>{
        return (
          removeFromCart && (
            <button
                onClick={() => {removeItemFromCart(product._id)
                  setReload(!reload)
                
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
          )
        )
  }
    return (
      <div className="card text-white bg-dark border border-info ">
     
    <div className="card-header lead">{productTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
         <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {productDesc}
          </p>
    <p className="btn btn-success rounded  btn-sm px-4">$ {productPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card