import React from 'react';
import BrandCard from './BrandCard';

const Brands = ({brands, brandName}) => {
    return (
        <section className='py-20 px-4 bg-white dark:bg-[#0A0A0A]'>
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Our Collection</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-3">Shop by <span className="text-[#D4AF37]">Brand</span></h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
                    {brands && brands.map(brand => <BrandCard key={brand.id} brand={brand} />)}
                </div>
            </div>
        </section>
    );
};

export default Brands;