import React, { useState } from 'react'
import Base from '../core/Base'
import { signUp } from '../auth/helper'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        signUp({ name, email, password })
            .then(res => {
                if (!res.data.success) {
                    setValues({ ...values, error: res.data.message, success: false })
                } else {
                    // reset values
                    setValues({
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const successMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-success'
                        style={{ 'display': success ? "" : "none" }}
                    >
                        Account created successfully please <Link className='text-primary' to="/signin">login here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-danger'
                        style={{ 'display': error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className=''>Name</label>
                            <input onChange={handleChange("name")} value={name} type='text' className='form-control' />
                        </div>
                        <div className='form-group mb-2'>
                            <label className=''>Email</label>
                            <input onChange={handleChange("email")} value={email} type='text' className='form-control' />
                        </div>
                        <div className='form-group mb-2'>
                            <label className=''>Password</label>
                            <input onChange={handleChange("password")} value={password} type='password' className='form-control' />
                        </div>
                        <button onClick={onSubmit} className='btn btn-dark w-100 mt-2'>Sign Up</button>
                    </form>
                </div >
            </div >
        )
    }
    return (
        <Base >
            <div className=' flex flex-col h-[90vh] justify-center px-3 sm:px-0'>
                <h2 className="text-2xl font-bold mb-10 text-center">Sign up to StyleBazaar !!!</h2>
                {successMessage()}
                {errorMessage()}
                {signUpForm()}
            </div>
        </Base>
    )
}

export default Signup
