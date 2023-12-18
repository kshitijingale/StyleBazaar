import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ categoryName, categoryId }) => {

    return (
        <Link to={`/products/${categoryId}`}>
            <div className="max-w-[300px]  rounded overflow-hidden shadow-lg mt-5 mb-20 md:mt-10  mx-auto hover:cursor-pointer">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{categoryName}</div>
                    {/* You can add more content like images or descriptions here */}
                    <img src={require(`../assets/images/${categoryName}.png`)} alt='Category' />
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
