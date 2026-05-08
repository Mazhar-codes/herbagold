import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import { FaUser, FaBox, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

const AdminWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${API_BASE_URL}/admin/wishlist`)
            .then(res => res.json())
            .then(data => {
                setWishlistItems(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredItems = wishlistItems.filter(item => 
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-[#0A0A0A]">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">Analytics</span>
                        <h1 className="text-3xl font-bold mt-1 dark:text-white">Customer <span className="text-[#D4AF37]">Wishlists</span></h1>
                        <p className="text-gray-500 mt-1">See which products are most popular among your customers.</p>
                    </div>

                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search by user or product..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#D4AF37] w-full md:w-80 shadow-sm"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-lg text-[#D4AF37]"></span>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div key={item._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all border-l-4 border-l-[#D4AF37]">
                                <div className="flex items-start gap-4 mb-4">
                                    <img src={item.photourl} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-100 dark:border-gray-700" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{item.name}</h3>
                                        <p className="text-[#D4AF37] font-bold text-sm">PKR {item.price}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-gray-800">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500">
                                            <FaUser size={12} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Interested User</p>
                                            <p className="font-medium dark:text-gray-300 truncate">{item.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500">
                                            <FaCalendarAlt size={12} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Date Added</p>
                                            <p className="font-medium dark:text-gray-300">
                                                {item.addedAt ? new Date(item.addedAt).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex gap-2">
                                    <a href={`mailto:${item.email}`} className="flex-1 py-2 bg-black text-white text-xs font-bold rounded-lg text-center hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2">
                                        <FaEnvelope /> Contact User
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-bold text-gray-400">No wishlist items found.</h2>
                        {searchTerm && <p className="text-gray-500 mt-2">Try searching with a different term.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminWishlist;
