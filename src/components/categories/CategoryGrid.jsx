import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { name: "Hair Care", tag: "hairfall", icon: "💆‍♀️", desc: "Solutions for hairfall and growth" },
    { name: "Facial Care", tag: "facial", icon: "✨", desc: "Organic facial routines" },
    { name: "Natural Soap", tag: "face soap", icon: "🧼", desc: "Handmade herbal soap bars" },
    { name: "Serums", tag: "hair serum", icon: "💧", desc: "Pure natural hair serums" },
];

const CategoryGrid = () => {
    return (
        <section className="py-20 bg-white dark:bg-[#0A0A0A]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Explore</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-3 text-gray-900 dark:text-white">
                        Shop by <span className="text-[#D4AF37]">Need</span>
                    </h2>
                    <p className="text-gray-500 mt-4">Targeted herbal solutions for your beauty concerns</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <Link 
                            to={`/brand/HERBA GOLD`} // Since they have one brand mostly, or could be dynamic
                            key={i}
                            className="group bg-gray-50 dark:bg-[#141414] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-[#D4AF37]/30 transition-all duration-500 hover:shadow-2xl text-center"
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                        >
                            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{cat.icon}</div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">{cat.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{cat.desc}</p>
                            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-tighter border-b-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-all">
                                View Collection →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
