import React, { useState } from 'react'
import Base from '../core/Base'
import { authenticate, isAuthenticated, signIn } from '../auth/helper'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })

    const navigate = useNavigate()

    const { email, password, error, loading, didRedirect } = values

    const { userInfo } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const loadingMessage = () => {
        return (

            loading && (
                <div className='alert alert-info'> <h2>loading...</h2> </div>
            )

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

    const performRedirect = () => {
        if (didRedirect) {
            if (userInfo && userInfo.role === "ADMIN") {
                return navigate("/admin/dashboard")
            } else {
                return navigate("/user/dashboard")
            }
        }
        if (isAuthenticated()) {
            navigate('/')
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // setValues({ ...values, loading: true })
        signIn({ email, password })
            .then((res) => {
                if (!res.data.success) {
                    setValues({ ...values, error: res.data.message, loading: false })
                } else {
                    authenticate(res.data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(err => console.log(err))
    }


    const signInForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className=''>Email</label>
                            <input onChange={handleChange("email")} value={email} type='email' className='form-control' />
                        </div>
                        <div className='form-group mb-2'>
                            <label className=''>Password</label>
                            <input onChange={handleChange("password")} value={password} type='password' className='form-control' />
                        </div>
                        <button onClick={onSubmit} className='btn w-full btn-dark mt-2'>Sign In</button>
                    </form>
                    <p className='mt-2'>Don't have an account {
                        <Link to={"/signup"}>
                            <button className='text-blue-400 hover:text-blue-500'>Sign up</button>
                        </Link>
                    }</p>
                </div >
            </div >
        )
    }
    return (
        <Base>
            <div className='flex flex-col h-[90vh] justify-center px-3 sm:px-0'>
                <h2 className="text-2xl font-bold mb-10 text-center">Sign in to StyleBazaar !!!</h2>
                {loadingMessage()}
                {errorMessage()}
                {signInForm()}
                {performRedirect()}
            </div>
        </Base>
    )
}

export default Signin
