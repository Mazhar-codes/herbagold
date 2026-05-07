import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const BrandCard = ({brand}) => {
    const { id, brandName, brandImage } = brand || {};

    return (
        <Link to={`/brand/${brandName}`} relative="path" className="group">
            <div data-aos="fade-up" className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-2">
                <div className='h-[250px] overflow-hidden'>
                    <img src={brandImage} className='w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500' alt={brandName} />
                </div>
                <div className="p-5 text-center border-t border-gray-100 dark:border-gray-800">
                    <h3 className="font-bold text-xl">{brandName}</h3>
                    <button className='mt-3 px-6 py-2 bg-[#D4AF37] text-white font-bold rounded-lg hover:bg-black transition-all text-sm'>
                        View Products →
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default BrandCard;