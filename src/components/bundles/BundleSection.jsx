import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import BrandlProductCard from '../../pages/brandProductPages/BrandlProductCard';

const BundleSection = () => {
    const [bundles, setBundles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/products`)
            .then(res => res.json())
            .then(data => {
                const bundleProducts = data.filter(product => product.isBundle === true || product.isBundle === 'true').slice(0, 4);
                setBundles(bundleProducts);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // if (!loading && bundles.length === 0) return null; // Removed to show section even when empty for verification

    return (
        <section className="py-20 bg-gradient-to-b from-white to-amber-50/30 dark:from-[#0A0A0A] dark:to-[#050505]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm">Special Offers</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 dark:text-white">Bundle <span className="text-[#D4AF37]">Savings</span></h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl text-lg italic">
                            Grab our exclusive curated sets and save more on your favorite herbal essentials.
                        </p>
                    </div>
                    <Link to="/bundles" className="group flex items-center gap-3 text-lg font-bold hover:text-[#D4AF37] transition-all">
                        View All Bundles 
                        <span className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-all shadow-lg">→</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-[#D4AF37]"></span>
                    </div>
                ) : bundles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bundles.map(bundle => (
                            <BrandlProductCard key={bundle._id} oneproduct={bundle} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-400 italic">No bundle offers available at the moment. Add products and mark them as bundles to see them here!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BundleSection;
