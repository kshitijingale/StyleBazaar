import React, { useEffect, useState } from 'react'
import Base from './Base'
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from './helper/coreapicalls';
import Card from './Card';

const ProductsByCategory = () => {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();

    const loadProductsByCategory = () => {
        getProductsByCategory(categoryId).then(response => {
            if (!response.data.success) {
                console.log(response.data.message);
            } else {
                setProducts(response.data.products);
            }
        });
    };

    useEffect(() => {
        loadProductsByCategory();
    });

    return (
        <Base>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap m-4">
                        {
                            products.length > 0 ? (
                                <>
                                    {
                                        products.map((product, index) => {
                                            return (
                                                <Card key={index} product={product} />
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <div className='h-screen w-screen flex justify-center items-start'>
                                    <h1 className='text-center font-bold text-2xl text-black'> Products not available for this category !!!</h1>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </Base>
    )
}

export default ProductsByCategory