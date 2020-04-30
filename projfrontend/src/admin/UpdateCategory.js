import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"
import {updateCategory, getCategory} from "./helper/adminapicall"
const UpdateCategory = ({match})=>{
    const [name,setName] = useState()
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    const {user, token} = isAuthenticated()


    const preload = (categoryId)=>{
        getCategory(categoryId).then(data=>{
            if(data.error)
            {
                setError(true)
            }
            else{
                setName(data.name)

            }
        })
    }
    useEffect(()=>{
        preload(match.params.categoryId)
    },[])
    
    const successMessage=()=>{
        if(success)
        {
            return <h4 className="text-success">Category Updated successfully</h4> 
        }
        
    }
    const errorMessage=()=>{
        if(error)
        {
            return <h4 className="text-danger">Failed to update category</h4>
        }
    }

    const handleChange=event=>{
        setError("")
        setName(event.target.value)
    }
    const onSubmit = (event)=>{
        event.preventDefault()
        setError("")
        setSuccess(false)

        //backend request fired
        updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data=>{
            if(data.error)
            {
                setError(true)
            }
            else{
                setError("")
                setSuccess(true)
                setName("")
            }
        })
        .catch(err=>console.log(err))
    }

    const goBack = ()=>{
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>

            </div>
        )
    }
    const myCategoryForm = ()=>{
        return (
        <form>
            <div className="form-group">
                <p>Enter the category</p>
                <input 
                value={name}
                onChange={handleChange}
                type="text"
                className="form-control my-3"
                autoFocus
                required
                placeholder="For Example Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>

            </div>
        </form>
        )}

    return (
        <Base
        title="Create a category here" 
        description="Add a new category for new tshirts"
        className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                   {myCategoryForm()}
                   {goBack()}
                </div>

            </div>
        </Base>
    )
}

export default UpdateCategory