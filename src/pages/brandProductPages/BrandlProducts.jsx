import { useLoaderData, useParams } from 'react-router-dom';
import BrandlProductCard from './BrandlProductCard';

const BrandlProducts = () => {
    const product = useLoaderData();
    const { brandName } = useParams();

    return (
        <div className='min-h-screen py-12 px-4 bg-gray-50 dark:bg-[#0A0A0A]'>
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Our Collection</span>
                    <h1 className="text-4xl lg:text-5xl font-bold mt-3">
                        {brandName} <span className="text-[#D4AF37]">Products</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-3">
                        {product.length} product{product.length !== 1 ? 's' : ''} available
                    </p>
                </div>

                {product.length !== 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {product.map(oneproduct => (
                            <BrandlProductCard key={oneproduct._id} oneproduct={oneproduct} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center py-20'>
                        <div className="text-7xl mb-4">🌿</div>
                        <h2 className='text-3xl font-bold text-gray-300 dark:text-gray-600'>No products found</h2>
                        <p className="text-gray-400 mt-2">No products are available for this brand yet.</p>
                        <a
                            href="https://wa.me/923155757274"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all"
                        >
                            💬 Ask on WhatsApp
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandlProducts;