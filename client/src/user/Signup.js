import React from 'react'
import Base from '../core/Base'

const Signup = () => {
    const signUpForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='text-light'>Name</label>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='text-light'>Email</label>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='text-light'>Password</label>
                            <input type='password' className='form-control' />
                        </div>
                        <button className='btn btn-success w-100 mt-2'>Sign Up</button>
                    </form>
                </div >
            </div >
        )
    }
    return (
        <Base title='Sign Up Page' description='A page for user to sign up!'>
            {signUpForm()}
        </Base>
    )
}

export default Signup
