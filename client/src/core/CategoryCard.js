import React from 'react';

const CategoryCard = ({ categoryName }) => {
    console.log(categoryName);
    return (
        <div className="max-w-[300px] md:max-w-sm lg:max-w-lg rounded overflow-hidden shadow-lg mt-5 mb-10 md:mt-10 md:mb-20 mx-auto">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{categoryName}</div>
                {/* You can add more content like images or descriptions here */}
                <img src={require(`../assets/images/${categoryName}.png`)} />
            </div>
        </div>
    );
};

export default CategoryCard;
