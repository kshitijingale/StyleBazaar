import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { getCategories, createProduct } from './helper/adminapicall';

const AddProduct = () => {
    const navigate = useNavigate()
    const { userInfo, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const { name,
        description,
        price,
        stock,
        categories,
        error,
        createdProduct,
        getaRedirect,
        formData
    } = values;

    const preload = () => {
        getCategories().then(response => {
            if (!response.data.success) {
                setValues({ ...values, error: response.data.message });
            } else {
                setValues({ ...values, categories: response.data.categories, formData: new FormData() });
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        createProduct(userInfo._id, token, formData).then(response => {
            if (!response.data.success) {
                setValues({ ...values, error: response.data.message });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    error: "",
                    loading: false,
                    createdProduct: response.data.product.name,
                    getaRedirect: true
                });
            }
        });

    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        if (name !== "photo") {
            setValues({ ...values, [name]: value });
        }
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h4>{createdProduct} created successfully</h4>
        </div>
    );

    const errorMessage = () => {
        if (error) {
            return <h4 className="text-danger mt-3">{error}</h4>;
        }
    };

    const redirectToPanel = () => {
        if (getaRedirect) {
            setTimeout(() => {
                navigate('/admin/dashboard')
            }, 2000)
        }
    }

    const createProductForm = () => (
        <form className='py-2'>
            <span>Post photo</span>
            <div className="form-group my-2 bg-success">
                <label className="btn btn-block text-white">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group my-2">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group my-2">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group my-2">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group my-2">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select Category</option>
                    {
                        categories &&
                        categories.map((category, index) => {
                            return <option key={index} value={category._id}>{category.name}</option>
                        })
                    }
                </select>
            </div>
            <div className="form-group my-2">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success my-2">
                Create Product
            </button>
        </form>
    );


    return (
        isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" ? (
            <Base
                title="Add product"
                description="Add a new product for StyleBazaar"
                className="container bg-info p-4"
            >
                <div className='flex flex-col h-[90vh] justify-center px-3 sm:px-0'>
                    <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                        Admin Home
                    </Link>
                    <div className="row bg-white rounded">
                        <div className="col-md-8 offset-md-2">
                            {successMessage()}
                            {errorMessage()}
                            {redirectToPanel()}
                            {createProductForm()}
                        </div>
                    </div>
                </div>
            </Base>
        ) : (
            <Navigate to="/signin" />
        )
    );
}

export default AddProduct
