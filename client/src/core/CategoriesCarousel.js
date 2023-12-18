// CategoriesCarousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import CategoryCard from './CategoryCard';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS import

const CategoriesCarousel = ({ categories }) => {
    const getSlidePercentage = () => {
        const width = window.innerWidth;
        if (width < 640) { // For small devices (e.g., mobile phones)
            return 100; // Show one card at a time
        } else { // For larger devices
            return 33.33; // Show three cards at a time
        }
    };

    return (
        <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            swipeable={true}
            useKeyboardArrows={true}
            centerMode={true}
            centerSlidePercentage={getSlidePercentage()}
        >
            {categories.map((category, index) => (
                <CategoryCard key={index} categoryName={category.name} categoryId={category._id} />
            ))}
        </Carousel>
    );
};

export default CategoriesCarousel;
