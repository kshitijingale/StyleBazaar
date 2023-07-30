import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Navigate } from "react-router-dom";

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = f => f, reload }) => {
    const [redirect, setRedirect] = useState(false)

    const addToCart = () => {
        addItemToCart(product, () => { setRedirect(true) })
    }

    const showAddToCart = addtoCart => {
        return (
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id)
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        );
    };

    const getRedirected = (redirect) => {
        if (redirect) {
            return <Navigate to='/cart' />
        }
    }

    return (
        <div className="card text-white bg-dark border border-info text-center">
            <div className="card-header lead">{product.name}</div>
            <div className="card-body">
                {getRedirected(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {product.description}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">₹{product.price}</p>
                <div className="row">
                    <div className="col-12">{showAddToCart(addtoCart)}</div>
                    <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;
