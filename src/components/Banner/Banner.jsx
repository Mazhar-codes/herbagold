import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Banner.css"
import Typewriter from 'typewriter-effect';
import heroImage from '../../assets/shampoo.jpeg';
import { Link } from 'react-router-dom';

const Banner = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-white dark:bg-[#0A0A0A]">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4AF37]/5 skew-x-12 transform origin-top-right -z-0 hidden sm:block"></div>
            
            <div className="container mx-auto px-4 py-12 sm:py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
                {/* Text Content */}
                <div data-aos="fade-right" className="flex flex-col gap-5 sm:gap-6 text-center sm:text-left order-2 lg:order-1">
                    <div className="inline-flex justify-center sm:justify-start">
                        <span className="px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-xs sm:text-sm uppercase tracking-widest border border-[#D4AF37]/20">
                            🌿 Premium Herbal Care
                        </span>
                    </div>
                    
                    {/* Responsive headline height */}
                    <div className="h-[80px] sm:h-[120px] lg:h-[180px]">
                        <Typewriter
                            options={{ delay: 40, deleteSpeed: 20 }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString('<span class="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight">Elevate Your <br/><span class="text-[#D4AF37]">Natural Glow</span></span>')
                                    .pauseFor(1000)
                                    .start();
                            }}
                        />
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-md mx-auto sm:mx-0 leading-relaxed">
                        Discover pure botanical luxury. HERBA GOLD brings you the finest herbal formulations for hair and skin that radiates health and elegance.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-2 justify-center sm:justify-start">
                        <Link
                            to="/brand/HERBA GOLD"
                            className="px-6 py-3.5 sm:px-8 sm:py-4 bg-black text-white dark:bg-[#D4AF37] dark:text-white font-bold rounded-xl hover:bg-[#D4AF37] dark:hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg text-center text-sm sm:text-base"
                        >
                            🛍️ Shop Collection
                        </Link>
                        <a
                            href="https://wa.me/923155757274"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 sm:px-8 sm:py-4 border-2 border-black dark:border-[#D4AF37] text-black dark:text-[#D4AF37] font-bold rounded-xl hover:bg-black hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all transform hover:-translate-y-1 text-center text-sm sm:text-base"
                        >
                            💬 WhatsApp Us
                        </a>
                    </div>

                    {/* Stats row */}
                    <div className="flex justify-center sm:justify-start gap-6 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                        {[['100%', 'Natural'], ['4.9★', 'Rating'], ['Fast', 'Delivery']].map(([val, label]) => (
                            <div key={label} className="text-center">
                                <div className="text-lg font-bold text-[#D4AF37]">{val}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Section */}
                <div data-aos="fade-left" className="relative order-1 lg:order-2">
                    {/* Glow behind image */}
                    <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-3xl blur-3xl scale-90"></div>
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-xs sm:max-w-sm lg:max-w-full mx-auto">
                        <img src={heroImage} alt="HERBA GOLD Products" className="w-full h-56 sm:h-72 lg:h-auto object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
