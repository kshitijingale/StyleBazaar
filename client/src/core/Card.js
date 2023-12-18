import React from "react";
import ImageHelper from "./helper/ImageHelper";

import { Link } from "react-router-dom";

const Card = ({ product }) => {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link to={`/product/${product._id}`} className="block relative rounded overflow-hidden cursor-pointer">
                <ImageHelper classes="object-cover object-center w-full h-full block" product={product} />
                <div className="mt-4">
                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                    <p className="mt-1">₹{product.price}</p>
                </div>
            </Link>
        </div>

    );
};

export default Card;
