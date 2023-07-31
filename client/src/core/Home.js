import React, { useEffect, useState } from 'react'
import "../styles.css"
import Base from './Base'
import { getProducts } from './helper/coreapicalls'
import Card from './Card'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        getProducts().then(response => {
            if (!response.data.success) {
                setError(response.data.message);
            } else {
                setProducts(response.data.products);
            }
        });
    };

    useEffect(() => {
        loadAllProduct();
    }, []);

    return (
        <Base title='StyleBazaar' description='Online Store'>
            <div className='row'>
                {products.map((product, index) => {
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product} />
                        </div>
                    );
                })}
            </div>
        </Base>
    )
}

export default Home
