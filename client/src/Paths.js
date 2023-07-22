import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Paths
