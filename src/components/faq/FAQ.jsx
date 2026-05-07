import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqData = [
    {
        question: "What ingredients are in HERBA GOLD products?",
        answer: "All HERBA GOLD products are formulated with 100% natural herbal extracts. Our shampoo, serum, facewash, and soapbar contain premium botanical ingredients selected for maximum effectiveness and safety."
    },
    {
        question: "How can I place an order?",
        answer: "You can add products to your cart and checkout directly on our website. You'll receive a confirmation email. Alternatively, you can order via WhatsApp at +92 315 5757274."
    },
    {
        question: "What is your delivery policy?",
        answer: "We deliver nationwide across Pakistan. Orders are typically shipped within 24 hours and delivered within 3-5 business days. Shipping is free on all orders."
    },
    {
        question: "Are HERBA GOLD products safe for sensitive skin?",
        answer: "Yes! Our products are dermatologist-tested and free from harsh chemicals, parabens, and sulfates. They are suitable for all skin types, including sensitive skin."
    },
    {
        question: "How can I contact support?",
        answer: "You can reach us 24/7 on WhatsApp at +92 315 5757274 or email us at supportherbagold072@gmail.com. Our team typically responds within an hour."
    }
];

const FAQ = () => {
    return (
        <section data-aos="fade-up" className='py-20 px-4 bg-white dark:bg-[#0A0A0A]'>
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Got Questions?</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-3">Frequently Asked <span className="text-[#D4AF37]">Questions</span></h2>
                </div>

                <div className="flex flex-col gap-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="collapse collapse-plus bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                            <div className="collapse-title text-lg font-bold pr-12">
                                {faq.question}
                            </div>
                            <div className="collapse-content">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center p-8 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
                    <p className="text-lg font-medium">Still have questions?</p>
                    <a href="https://wa.me/923155757274" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all">
                        💬 Chat on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;