import React, { useState } from 'react'
import Base from '../core/Base'
import { authenticate, isAuthenticated, signIn } from '../auth/helper'
import { redirect } from 'react-router-dom'
redirect()

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })

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
                return <p>redirect to admin dashboard</p>
            } else {
                return <p>redirect to user dashboard</p>
            }
        }
        if (isAuthenticated()) {
            redirect("/")
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
                            <label className='text-light'>Email</label>
                            <input onChange={handleChange("email")} value={email} type='email' className='form-control' />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='text-light'>Password</label>
                            <input onChange={handleChange("password")} value={password} type='password' className='form-control' />
                        </div>
                        <button onClick={onSubmit} className='btn btn-success w-100 mt-2'>Sign In</button>
                    </form>
                </div >
            </div >
        )
    }
    return (
        <Base title='Sign In Page' description='A page for user to sign in!'>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin
