import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/user/dashboard' element={<UserDashboard />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/create/category' element={<AddCategory />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Paths
