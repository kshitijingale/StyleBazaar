import React, { useEffect, useState } from 'react'
import "../styles.css"
import Base from './Base'
import { getCategories } from './helper/coreapicalls'
import CarouselSlider from './CarouselSlider'
import CategoriesCarousel from './CategoriesCarousel';

const Home = () => {
    const [categories, setCategories] = useState([]);

    const loadAllCategories = () => {
        getCategories().then(response => {
            console.log(response.data);
            if (!response.data.success) {
                console.log(response.data.message);
            } else {
                setCategories(response.data.categories)
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
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
        </Base>
    )
}

export default Home
