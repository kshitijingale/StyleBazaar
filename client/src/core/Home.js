import React, { useEffect, useState } from 'react'
import "../styles.css"
import Base from './Base'
import { getProducts, getCategories } from './helper/coreapicalls'
import Card from './Card'
import CarouselSlider from './CarouselSlider'
import CategoriesCarousel from './CategoriesCarousel';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
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

    const loadAllCategories = () => {
        getCategories().then(response => {
            if (!response.data.success) {
                setError(response.data.message);
            } else {
                setCategories(response.data.names)
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        loadAllProduct();
        loadAllCategories();
    }, []);

    return (
        <Base title='StyleBazaar' description='Online Store'>
            <CarouselSlider />
            <div className="container mx-auto my-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold my-2">Shop by Category</h2>
                <div className="carousel-wrapper flex justify-center">
                    <CategoriesCarousel categories={categories} />

                </div>
            </div>
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
