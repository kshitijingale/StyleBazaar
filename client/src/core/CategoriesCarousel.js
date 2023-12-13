// CategoriesCarousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import CategoryCard from './CategoryCard';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS import

const CategoriesCarousel = ({ categories }) => {
    return (
        <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            swipeable={true}
            useKeyboardArrows={true}
            centerMode={false}
        >
            {categories.map((category, index) => (
                <CategoryCard key={index} categoryName={category} />
            ))}
        </Carousel>
    );
};

export default CategoriesCarousel;
