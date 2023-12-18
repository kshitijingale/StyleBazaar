import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct, getCategories } from './helper/adminapicall';

const UpdateProduct = () => {
    const { userInfo, token } = isAuthenticated()
    const { productId } = useParams();
    const navigate = useNavigate()

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
        updatedProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const {
        name,
        description,
        price,
        stock,
        categories,
        // category,
        // loading,
        error,
        updatedProduct,
        getaRedirect,
        formData
    } = values;

    const preload = productId => {
        getProduct(productId).then(response => {
            if (!response.data.success) {
                setValues({ ...values, error: response.data.message });
            } else {
                preloadCategories();
                setValues({
                    ...values,
                    name: response.data.product.name,
                    description: response.data.product.description,
                    price: response.data.product.price,
                    category: response.data.product.category.name,
                    stock: response.data.product.stock,
                    formData: new FormData()
                });
            }
        });
    };

    const preloadCategories = () => {
        getCategories().then(response => {
            if (!response.data.success) {
                setValues({ ...values, error: response.data.message });
            } else {
                setValues({
                    categories: response.data.categories,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        preload(productId);
    });

    //TODO: work on it
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(productId, userInfo._id, token, formData).then(
            response => {
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
                        category: "",
                        loading: false,
                        updatedProduct: response.data.product.name,
                        getaRedirect: true
                    });
                }
            }
        );
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedProduct ? "" : "none" }}
        >
            <h4>{updatedProduct} updated successfully</h4>
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
            }, 3000)
        }
    }

    const updateProductForm = () => (
        <form className='py-2'>
            <span> Post photo</span>
            <div className="form-group my-2  bg-success">
                <label className="btn btn-block">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group my-2 ">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group my-2 ">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group my-2 ">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group my-2 ">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories &&
                        categories.map((cate, index) => (
                            <option key={index} value={cate._id} >
                                {cate.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group my-2 ">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                Update Product
            </button>
        </form >
    );

    return (
        isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" ? (
            <Base
                className="container bg-info p-4"
            >
                <div className='flex flex-col h-[90vh] justify-center px-3 sm:px-0'>

                    <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                        Admin Home
                    </Link>
                    <div className="row bg-white rounded">
                        <div className="col-md-8 offset-md-2">
                            {redirectToPanel()}
                            {successMessage()}
                            {errorMessage()}
                            {updateProductForm()}
                        </div>
                    </div>
                </div>
            </Base>
        ) : (
            <Navigate to="/signin" />
        )
    );
}

export default UpdateProduct
