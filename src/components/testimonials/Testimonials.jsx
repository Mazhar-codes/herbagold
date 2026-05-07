import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        name: "Sana Ahmed",
        role: "Verified Customer",
        comment: "Herba Gold's Hair Serum is a game changer! My hair feels so soft and shiny after just one week of use. Highly recommended!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sana"
    },
    {
        id: 2,
        name: "Hamza Khan",
        role: "Verified Customer",
        comment: "The face wash is extremely gentle and didn't dry out my skin. I love the herbal scent. 10/10 for quality and packaging.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=hamza"
    },
    {
        id: 3,
        name: "Ayesha Malik",
        role: "Verified Customer",
        comment: "Best shampoo I've used in a long time. It actually reduced my hair fall. So happy I found this local brand!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=ayesha"
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-white dark:bg-[#0A0A0A] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Testimonials</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-3 text-gray-900 dark:text-white">
                        What Our <span className="text-[#D4AF37]">Customers Say</span>
                    </h2>
                    <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div 
                            key={t.id} 
                            className="bg-gray-50 dark:bg-[#141414] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 relative group"
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                        >
                            <FaQuoteLeft className="text-4xl text-[#D4AF37]/20 absolute top-6 right-8 group-hover:text-[#D4AF37]/40 transition-colors" />
                            
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-[#D4AF37] text-sm" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 italic leading-relaxed">
                                "{t.comment}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/30" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
