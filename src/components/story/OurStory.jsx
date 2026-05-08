import React from 'react';
// import storyImg from '../../assets/brand-story.jpg'; // Enable this once the file is added to src/assets/
const storyImg = "https://images.unsplash.com/photo-1611080626919-7cf5a969fc8f?auto=format&fit=crop&q=80&w=1200"; // Premium Herbal/Nature placeholder

const OurStory = () => {
    return (
        <section className="py-20 px-4 bg-white dark:bg-[#0A0A0A] overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image Column */}
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-2xl blur-2xl transform -rotate-3"></div>
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/20">
                            <img 
                                src={storyImg} 
                                alt="Herba Gold Brand Story" 
                                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-2xl"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Text Column */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-2">
                            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm">Heritage</span>
                            <h2 className="text-4xl lg:text-5xl font-bold dark:text-white">Our Brand <span className="text-[#D4AF37]">Story</span></h2>
                        </div>

                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
                            <p className="border-l-4 border-[#D4AF37] pl-6 py-2">
                                "Since 1940, my family embraced a pure life, crafting everyday essentials from home using only nature's purest organic gifts."
                            </p>
                            
                            <p>
                                It was our secret to radiance, passed down through generations. Now, as the new generation, we bring this ancient wisdom to you.
                            </p>

                            <p className="font-medium text-gray-800 dark:text-gray-200 non-italic">
                                We use the exact same formulas, secured in safe-keeping. Our promise is unwavering quality, home-crafted and carefully made in our kitchen laboratory.
                            </p>

                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 relative">
                                <span className="absolute -top-3 left-6 bg-[#D4AF37] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-md shadow-lg">Our Philosophy</span>
                                <p className="text-sm">
                                    Why? Because your skin is not ordinary. It is a sacred canvass that deserves the most thoughtful care. We believe in preserving the integrity of every ingredient. This is what we call <strong className="text-[#D4AF37]">The Golden Standard of Nature.</strong>
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="px-8 py-4 bg-[#D4AF37] text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg transform hover:-translate-y-1">
                                Explore Our Heritage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
