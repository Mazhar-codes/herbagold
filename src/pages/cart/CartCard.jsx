import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../config';
import { FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';

const CartCard = ({ detail, cart, setCart, quantity, onQuantityChange }) => {
    const [removing, setRemoving] = useState(false);
    const { _id, name, brandname, category, photourl, price, shortDesc } = detail;

    const unitPrice = parseFloat(price) || 0;
    const subtotal = unitPrice * quantity;

    const handleCartDelete = (_id) => {
        Swal.fire({
            title: 'Remove from cart?',
            text: "This item will be removed from your cart.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D4AF37',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Keep it'
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            setRemoving(true);
            const previousCart = [...cart];

            // Optimistic UI update
            setCart(cart.filter(item => item._id !== _id));

            try {
                const res = await fetch(`${API_BASE_URL}/cart/${_id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }

                if (data.deletedCount === 0 && !data.acknowledged) {
                    // Item wasn't found on server but we removed from UI — log it
                    console.warn('Cart item not found on server, removed from UI only.');
                }
            } catch (error) {
                console.error('Delete error:', error);
                // Revert optimistic update on network failure
                setCart(previousCart);
                Swal.fire({
                    title: 'Error',
                    text: 'Could not remove item. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#D4AF37'
                });
            } finally {
                setRemoving(false);
            }
        });
    };

    return (
        <div className={`bg-white dark:bg-[#141414] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ${removing ? 'opacity-40 scale-95' : 'hover:shadow-lg'}`}>
            <div className="flex flex-col sm:flex-row items-stretch">
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 dark:bg-gray-800">
                    <img className='w-full h-full object-cover' src={photourl} alt={name} />
                </div>

                {/* Product Info */}
                <div className="flex-1 p-4 flex flex-col justify-between gap-3">
                    <div>
                        <h2 className="text-base font-bold leading-tight">{name}</h2>
                        {shortDesc && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{shortDesc}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {brandname && (
                                <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold border border-[#D4AF37]/20">
                                    {brandname}
                                </span>
                            )}
                            {category && (
                                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
                                    {category}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Qty:</span>
                            <button
                                onClick={() => onQuantityChange(quantity - 1)}
                                disabled={quantity <= 1 || removing}
                                className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/20 flex items-center justify-center text-gray-600 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                title="Decrease quantity"
                            >
                                <FaMinus className="text-xs" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                            <button
                                onClick={() => onQuantityChange(quantity + 1)}
                                disabled={removing}
                                className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/20 flex items-center justify-center text-gray-600 dark:text-gray-400 disabled:opacity-40 transition-colors"
                                title="Increase quantity"
                            >
                                <FaPlus className="text-xs" />
                            </button>
                        </div>

                        {/* Price + Remove */}
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-lg font-bold text-[#D4AF37]">PKR {subtotal.toFixed(2)}</div>
                                {quantity > 1 && (
                                    <div className="text-xs text-gray-400">PKR {unitPrice.toFixed(2)} each</div>
                                )}
                            </div>
                            <button
                                onClick={() => handleCartDelete(_id)}
                                disabled={removing}
                                className="flex items-center gap-1.5 px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaTrashAlt className="text-xs" />
                                {removing ? '...' : 'Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;