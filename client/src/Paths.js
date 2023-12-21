import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import ManageCategory from './admin/ManageCategory'
import AddProduct from './admin/AddProduct'
import ManageProduct from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'
import ProductsByCategory from './core/ProductsByCategory'
import Product from './core/Product'

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/create/category' element={<AddCategory />} />
                <Route path='/admin/categories' element={<ManageCategory />} />
                <Route path='/admin/create/product' element={<AddProduct />} />
                <Route path='/admin/products' element={<ManageProduct />} />
                <Route path='/admin/product/update/:productId' element={<UpdateProduct />} />
                <Route path='/products/:categoryId' element={<ProductsByCategory />} />
                <Route path='/product/:productId' element={<Product />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Paths
