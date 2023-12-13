import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Navigate, Link } from 'react-router-dom';
import { getCategories } from './helper/adminapicall';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);

    // const { user, token } = isAuthenticated();

    const preload = () => {
        getCategories().then(response => {
            if (!response.data.success) {
                console.log(response.data.message);
            } else {
                setCategories(response.data.categories);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    return (
        isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" ? (
            <Base title="Welcome admin" description="Manage products here">
                <h2 className="mb-4">All categories:</h2>
                <Link className="btn btn-info" to={`/admin/dashboard`}>
                    <span className="">Admin Home</span>
                </Link>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-[#000] my-3">Total {categories.length} categories</h2>
                        {categories && categories.map((category, index) => {
                            return (
                                <div key={category._id} className="row text-center mb-2 ">
                                    <div className="col-4">
                                        <h3 className="text-[#000] text-left">{category.name}</h3>
                                    </div>
                                    <div className="col-4">
                                        <Link
                                            className="btn btn-success"
                                            to={`/admin/category/update/${category._id}`}
                                        >
                                            <span className="">Update</span>
                                        </Link>
                                    </div>
                                    <div className="col-4">
                                        <button onClick={() => { }} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Base >

        ) : (
            <Navigate to="/signin" />
        )
    );
}

export default ManageCategory
