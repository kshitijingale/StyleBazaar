import React, { useState } from 'react'
import Base from './Base'
import { Navigate, useParams } from 'react-router-dom'
import { getProduct } from './helper/coreapicalls';
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, loadCart } from './helper/cartHelper';


const Product = () => {
    const [redirect, setRedirect] = useState(false)
    const [product, setProduct] = useState({});
    const { productId } = useParams();

    const loadProduct = () => {
        getProduct(productId).then(response => {
            if (!response.data.success) {
                console.log(response.data.message);
            } else {
                setProduct(response.data.product);
            }
        });
    }

    const moveToCart = () => {
        addItemToCart(product, () => { setRedirect(true) })
    }

    const showCartBtn = () => {
        loadProduct();
        const doesExist = checkInCart()
        return (
            !doesExist ? (
                <button
                    onClick={moveToCart}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                    Add to Cart
                </button>
            ) : (
                <>
                    <button
                        onClick={() => { setRedirect(true) }}
                        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                        Go to Cart
                    </button>
                </>
            )
        );
    };

    const checkInCart = () => {
        const cartItems = loadCart();
        if (!cartItems) {
            return false;
        }
        const doesExist = cartItems.some((item) => item._id === product._id)
        return doesExist;
    }

    const getRedirected = (redirect) => {
        if (redirect) {
            return <Navigate to='/cart' />
        }
    }

    return (
        <Base>
            <section className="body-font overflow-hidden">
                <div className="container px-5 py-28 mx-auto">
                    {getRedirected(redirect)}
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <ImageHelper classes="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" product={product} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font  tracking-widest">BRAND NAME</h2>
                            <h1 className=" text-3xl title-font font-medium mb-1">{product.name}</h1>

                            <p className="leading-relaxed">{product.description}</p>
                            <div className="flex mt-3">
                                <span className="title-font font-medium text-2xl">₹{product.price}</span>

                                {showCartBtn()}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Base>

    )
}

export default Product
