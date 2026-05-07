import React from 'react';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Subscribed! 🌿',
            text: 'Thank you for subscribing to our newsletter. We will keep you updated with our latest products and offers.',
            confirmButtonColor: '#D4AF37'
        });
        e.target.reset();
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-[#0f0f0f]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Stay Updated</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">
                            Join the <span className="text-[#D4AF37]">Herba Gold</span> Family
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                            Subscribe to get special discounts, free giveaway alerts, and natural beauty tips delivered straight to your inbox.
                        </p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input 
                                type="email" 
                                placeholder="Your Email Address" 
                                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#D4AF37] transition-all"
                                required 
                            />
                            <button 
                                type="submit"
                                className="bg-[#D4AF37] text-white font-bold px-8 py-4 rounded-2xl hover:bg-black transition-all shadow-lg hover:-translate-y-1"
                            >
                                Subscribe Now
                            </button>
                        </form>
                        <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest">
                            No spam, only pure herbal goodness.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
