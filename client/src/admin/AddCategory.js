import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Navigate } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { userInfo, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = event => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        createCategory(userInfo._id, token, { name })
            .then(response => {
                if (!response.data.success) {
                    setError(response.data.message);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            });
    };

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success mt-3">Category created successfully</h4>;
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-danger mt-3">{error}</h4>;
        }
    };

    const myCategoryForm = () => (
        <form className="mt-3">
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Hoodies"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">
                    Create Category
                </button>
            </div>
        </form>
    );

    return (
        isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" ? (
            <Base
                title="Create a category here"
                description="Add a new category for new tshirts"
                className="container bg-info p-4"
            >
                <div className='flex flex-col h-[90vh] justify-center px-3 sm:px-0'>
                    <div className="row bg-white rounded">
                        <div className="col-md-8 offset-md-2">
                            {successMessage()}
                            {warningMessage()}
                            {myCategoryForm()}
                            {goBack()}
                        </div>
                    </div>
                </div>
            </Base>
        ) : (
            <Navigate to="/signin" />
        )
    );
};

export default AddCategory;
