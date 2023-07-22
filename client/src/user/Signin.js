import React from 'react'
import Base from '../core/Base'

const Signin = () => {

    const signInForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='text-light'>Email</label>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='text-light'>Password</label>
                            <input type='password' className='form-control' />
                        </div>
                        <button className='btn btn-success w-100 mt-2'>Sign In</button>
                    </form>
                </div >
            </div >
        )
    }
    return (
        <Base title='Sign In Page' description='A page for user to sign in!'>
            {signInForm()}
        </Base>
    )
}

export default Signin
