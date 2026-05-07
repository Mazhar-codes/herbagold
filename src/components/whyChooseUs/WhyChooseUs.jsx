import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBarcode,faGifts,faRectangleAd,faTruckFast,faCommentDots,faLeaf} from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos';
import 'aos/dist/aos.css';
import facewashImg from '../../assets/facewash.jpeg';


const features = [
    {
        icon: faLeaf,
        title: "100% Natural Ingredients",
        desc: "Our products are made from the finest herbal extracts, free from harmful chemicals."
    },
    {
        icon: faBarcode,
        title: "Authenticity Guarantee",
        desc: "Every HERBA GOLD product comes with our seal of authenticity. Quality you can trust."
    },
    {
        icon: faGifts,
        title: "Premium Herbal Formulations",
        desc: "Carefully crafted blends designed by experts to deliver visible results."
    },
    {
        icon: faTruckFast,
        title: "Fast & Secure Shipping",
        desc: "Nationwide delivery across Pakistan. Your order arrives safely and on time."
    },
    {
        icon: faRectangleAd,
        title: "Exclusive Offers",
        desc: "Get special discounts and early access to new product launches."
    },
    {
        icon: faCommentDots,
        title: "Customer-First Service",
        desc: "24/7 WhatsApp support at +92 315 5757274. We're always here for you."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 px-4 bg-gray-50 dark:bg-[#111]">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">The HERBA GOLD Difference</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-3">Why Choose <span className="text-[#D4AF37]">Us</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">Experience the gold standard of herbal beauty care. Here's what sets us apart.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
                                <FontAwesomeIcon icon={feature.icon} className="text-[#D4AF37] text-xl group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;