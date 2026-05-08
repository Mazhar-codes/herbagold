import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { API_BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaTrash, FaEye, FaShoppingBag } from 'react-icons/fa';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchWishlist();
        }
    }, [user]);

    const fetchWishlist = () => {
        fetch(`${API_BASE_URL}/wishlist/${encodeURIComponent(user.email)}`)
            .then(res => res.json())
            .then(data => {
                setWishlist(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleRemove = (id) => {
        Swal.fire({
            title: 'Remove from wishlist?',
            text: "You can always add it back later!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D4AF37',
            cancelButtonColor: '#000',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_BASE_URL}/wishlist/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        setWishlist(wishlist.filter(item => item._id !== id));
                        Swal.fire('Removed!', 'Product has been removed from your wishlist.', 'success');
                    }
                });
            }
        });
    };

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Please Login to view your wishlist</h2>
                <Link to="/login" className="btn bg-[#D4AF37] text-white hover:bg-black border-none px-8">Login Now</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 bg-gray-50 dark:bg-[#0A0A0A]">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-10 text-center">
                    <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">My Favorites</span>
                    <h1 className="text-4xl font-bold mt-2 dark:text-white">Your <span className="text-[#D4AF37]">Wishlist</span></h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-lg text-[#D4AF37]"></span>
                    </div>
                ) : wishlist.length > 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr className="border-b border-gray-100 dark:border-gray-700">
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Product</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlist.map((item) => (
                                        <tr key={item._id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-16 h-16 shadow-sm border border-gray-100 dark:border-gray-700">
                                                            <img src={item.photourl} alt={item.name} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold dark:text-white">{item.name}</div>
                                                        <div className="text-sm text-gray-400">{item.brandname}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-[#D4AF37]">PKR {item.price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                 {item.productDetails?.inStock !== false ? (
                                                     <span className="badge badge-success badge-sm text-white font-bold">In Stock</span>
                                                 ) : (
                                                     <span className="badge badge-error badge-sm text-white font-bold">Out of Stock</span>
                                                 )}
                                             </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Link to={`/viewDetail/${item.productId}`} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all" title="View Details">
                                                        <FaEye />
                                                    </Link>
                                                    <button onClick={() => handleRemove(item._id)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all" title="Remove">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                        <div className="text-6xl mb-6 opacity-20">❤️</div>
                        <h2 className="text-2xl font-bold text-gray-400">Your wishlist is empty</h2>
                        <p className="text-gray-500 mt-2 mb-8">Start adding items you love to keep track of them!</p>
                        <Link to="/brand/HERBA GOLD" className="px-8 py-3 bg-[#D4AF37] text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg">
                            Browse Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
