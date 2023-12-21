import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Navigate, Link } from 'react-router-dom';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    const { userInfo, token } = isAuthenticated();

    const preload = () => {
        getProducts().then(response => {
            if (!response.data.success) {
                console.log(response.data.message);
            } else {
                setProducts(response.data.products);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisProduct = productId => {
        deleteProduct(productId, userInfo._id, token).then(response => {
            if (!response.data.success) {
                console.log(response.data.message);
            } else {
                console.log(response)
                preload();
            }
        });
    };

    return (
        isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" ? (
            <Base title="Welcome admin" description="Manage products here">
                <div className='flex flex-col min-h-[90vh] justify-center px-3 sm:px-0'>
                    <h2 className="my-4">All products:</h2>
                    <Link className="btn btn-info" to={`/admin/dashboard`}>
                        <span className="">Admin Home</span>
                    </Link>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center my-3">Total {products.length} products</h2>

                            {products.map((product, index) => {
                                return (
                                    <div key={index} className="row text-center mb-2 ">
                                        <div className="col-4">
                                            <h3 className="text-left">{product.name}</h3>
                                        </div>
                                        <div className="col-4">
                                            <Link
                                                className="btn btn-success"
                                                to={`/admin/product/update/${product._id}`}
                                            >
                                                <span className="">Update</span>
                                            </Link>
                                        </div>
                                        <div className="col-4">
                                            <button
                                                onClick={() => {
                                                    deleteThisProduct(product._id);
                                                }}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Base>

        ) : (
            <Navigate to="/signin" />
        )
    );
}

export default ManageProduct
