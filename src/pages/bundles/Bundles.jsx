import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import BrandlProductCard from '../brandProductPages/BrandlProductCard';
import Banner from '../../components/banner/Banner';

const Bundles = () => {
    const [bundles, setBundles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/products`)
            .then(res => res.json())
            .then(data => {
                const bundleProducts = data.filter(product => product.isBundle === true || product.isBundle === 'true');
                setBundles(bundleProducts);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
            <div className="bg-black py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Exclusive <span className="text-[#D4AF37]">Bundle Offers</span></h1>
                <p className="text-gray-400 max-w-2xl mx-auto px-4">Discover our curated sets of premium herbal products at special prices. The perfect way to experience the full Herba Gold range.</p>
            </div>

            <div className="container mx-auto px-4 py-16">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-lg text-[#D4AF37]"></span>
                    </div>
                ) : bundles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {bundles.map(bundle => (
                            <BrandlProductCard key={bundle._id} oneproduct={bundle} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🎁</div>
                        <h2 className="text-2xl font-bold text-gray-500">No active bundles at the moment.</h2>
                        <p className="text-gray-400 mt-2">Check back soon for exciting new offers!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bundles;
