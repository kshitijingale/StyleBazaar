import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import { loadCart, removeItemFromCart, updateCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import { Link } from "react-router-dom";

const Cart = () => {
    const [products, setProducts] = useState([]);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            // Prevents the quantity from going below 1
            return;
        }

        // Update the quantity of the item in the cart
        const updatedItems = products.map(item => {
            if (item._id === itemId) {
                return { ...item, count: newQuantity };
            }
            return item;
        });
        updateCart(updatedItems)
        setProducts(updatedItems)
    };

    const removeFromCart = itemId => {
        removeItemFromCart(itemId)
        setProducts(loadCart());
    };

    const calculateTotal = () => {
        return products.reduce((acc, item) => acc + item.price * item.count, 0);
    };

    useEffect(() => {
        setProducts(loadCart());
    }, []);


    return (
        <Base>
            <div className='flex flex-col min-h-[90vh] justify-center px-3 sm:px-0'>
                <div className="container mx-auto px-2 sm:px-4 pt-20 flex flex-col md:flex-row">
                    <div className="w-full md:w-2/3 sm:p-4">
                        {products.length > 0 ? (
                            <>
                                {products.map(item => (
                                    <div key={item._id} className="flex flex-col sm:flex-row justify-between items-center mb-4  p-2 rounded-md bg-gray-100">
                                        <div className="flex items-center">
                                            <Link to={`/product/${item._id}`}>
                                                <ImageHelper classes="object-cover object-center h-28 w-28 block" product={item} />
                                            </Link>
                                            <div className="flex flex-col p-3 gap-2">
                                                <span>{item.name}</span>
                                                <div className="flex items-center space-x-4">
                                                    <button onClick={() => handleQuantityChange(item._id, item.count - 1)}>-</button>
                                                    <span>{item.count}</span>
                                                    <button onClick={() => handleQuantityChange(item._id, item.count + 1)}>+</button>
                                                </div>

                                                <button onClick={() => removeFromCart(item._id)} className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-1 px-2 rounded max-w-min">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-bold pr-4">₹{item.price * item.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (<h1 className="text-center text-2xl font-bold bg-gray-100 py-4">No products in the cart</h1>)}
                    </div>

                    <div className="md:w-1/3 bg-gray-100 p-4 rounded-md">

                        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                        <div>
                            <ul>
                                {products.map((item, index) => (
                                    <li key={index} className="flex justify-between items-end gap-2">
                                        <span>{item.name} x {item.count}</span>
                                        <span>₹{(item.price * item.count).toFixed(2)}</span>
                                    </li>
                                ))}
                                <li className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>₹{calculateTotal().toFixed(2)}</span>
                                </li>
                            </ul>
                        </div>
                        <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default Cart;
