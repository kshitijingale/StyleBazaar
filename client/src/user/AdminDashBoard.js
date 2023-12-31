import React from 'react'
import Base from '../core/Base'
import { Navigate, Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'

const AdminDashboard = () => {
    const {
        userInfo: { name, email }
    } = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">
                            Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success">
                            Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success">
                            Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success">
                            Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge text-bg-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge text-bg-success mr-2">Email:</span> {email}
                    </li>

                    <li className="list-group-item">
                        <span className="badge text-bg-danger">Admin Area</span>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" ? (
            <Base
                className="container p-4"
            >
                <div className='flex flex-col h-[90vh] justify-center px-3 sm:px-0'>
                    <div className="row">
                        <div className="col-3">{adminLeftSide()}</div>
                        <div className="col-9">{adminRightSide()}</div>
                    </div>
                </div>
            </Base>
        ) : (
            <Navigate to="/signin" />
        )
    )
}

export default AdminDashboard
