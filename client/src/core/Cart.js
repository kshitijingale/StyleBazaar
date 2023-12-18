import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div>
                {/* <h2>This section is to load products</h2> */}
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        );
    };
    // const loadCheckout = () => {
    //     return (
    //         <div>
    //             <h2>This section for checkout</h2>
    //         </div>
    //     );
    // };

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className='flex flex-col min-h-[90vh] justify-center px-3 sm:px-0'>

                <div className="row text-center">
                    <div className="col-6">{(products.length > 0 ? loadAllProducts() : (<h1>No products in the cart</h1>))}</div>
                    <div className="col-6">
                        <Payment products={products} setReload={setReload} />
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default Cart;
