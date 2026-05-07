import React from 'react';
import { FaUsers, FaLeaf, FaTruck, FaAward } from 'react-icons/fa';

const StatsBar = () => {
    const stats = [
        { icon: <FaUsers />, label: "Happy Customers", value: "10,000+" },
        { icon: <FaLeaf />, label: "Natural Ingredients", value: "100%" },
        { icon: <FaTruck />, label: "Fast Delivery", value: "Pakistan-Wide" },
        { icon: <FaAward />, label: "Quality Guarantee", value: "Premium" },
    ];

    return (
        <section className="py-12 bg-[#D4AF37] text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                            <div className="text-4xl mb-4 opacity-90">{stat.icon}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm uppercase tracking-widest opacity-80 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
