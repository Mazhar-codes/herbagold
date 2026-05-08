import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const BrandlProductCard = ({oneproduct}) => {
    const { _id, name, brandname, category, photourl, price, rating, shortDesc } = oneproduct;

    return (
        <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden">
                <img
                    src={photourl}
                    alt={name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-3 py-1 bg-[#D4AF37] text-white text-xs font-bold rounded-full">
                    {category}
                </span>
                {oneproduct.isBundle && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg animate-pulse">
                        🎁 Bundle Offer
                    </span>
                )}
            </div>

            <div className="p-5">
                <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
                <h3 className='font-bold text-lg mt-2'>{name}</h3>
                {shortDesc && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{shortDesc}</p>}

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-[#D4AF37]">PKR {parseFloat(price).toFixed(2)}</span>
                    <Link to={`/viewDetail/${_id}`}>
                        <button className="px-5 py-2 bg-black text-white font-bold rounded-lg hover:bg-[#D4AF37] transition-all text-sm">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BrandlProductCard;