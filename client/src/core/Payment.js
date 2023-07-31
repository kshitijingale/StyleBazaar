import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, setReload = f => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().userInfo._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getmeToken = (userId, token) => {
        getToken(userId, token).then(response => {
            if (!response.data.success) {
                setInfo({ ...info, error: response.data.message });
            } else {
                const clientToken = response.data.clientToken;
                setInfo({ clientToken });
            }
        });
    };

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>
                            Buy
                        </button>
                    </div>
                ) : (
                    <h3>Please login or add something to cart</h3>
                )}
            </div>
        );
    };

    useEffect(() => {
        getmeToken(userId, token);
    }, []);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESS");
                    //TODO: empty the cart
                    //TODO: force reload
                })
                .catch(error => {
                    setInfo({ loading: false, success: false });
                    console.log("PAYMENT FAILED");
                });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };

    return (
        <div>
            <h3>Your bill is ₹{getAmount()}</h3>
            {showbtdropIn()}
        </div>
    );
};

export default Payment;
