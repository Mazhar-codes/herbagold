import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';
import { FaSearch, FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

const TrackOrder = () => {
    const [trackingId, setTrackingId] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackingId) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await fetch(`${API_BASE_URL}/orders/track/${trackingId.trim().toUpperCase()}`);
            const data = await res.json();

            if (res.ok) {
                setOrder(data);
            } else {
                setError(data.error || 'Order not found. Please check your ID.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <FaClock className="text-amber-500" />;
            case 'Packed': return <FaBox className="text-blue-500" />;
            case 'Dispatched': return <FaTruck className="text-purple-500" />;
            case 'On its way': return <FaTruck className="text-indigo-500" />;
            case 'Delivered': return <FaCheckCircle className="text-green-500" />;
            default: return <FaClock className="text-gray-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] py-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Track Your <span className="text-[#D4AF37]">Order</span></h1>
                    <p className="text-gray-500">Enter your 7-character tracking ID to see the current status of your delivery.</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                    <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-8">
                        <input 
                            type="text" 
                            placeholder="e.g. ABC1234" 
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#D4AF37] transition-all font-mono uppercase"
                            required 
                        />
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-[#D4AF37] text-white font-bold px-8 py-4 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : <><FaSearch /> Track Order</>}
                        </button>
                    </form>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 p-4 rounded-2xl text-center">
                            {error}
                        </div>
                    )}

                    {order && (
                        <div className="mt-8 animate-fade-in">
                            <div className="flex items-center justify-between mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Current Status</p>
                                    <p className="text-2xl font-bold flex items-center gap-3 mt-1">
                                        {getStatusIcon(order.status)} {order.status}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Order ID</p>
                                    <p className="font-mono font-bold text-[#D4AF37] mt-1">{order.trackingId}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                        <FaCheckCircle className="text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Order Received</p>
                                        <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()} - We have received your order.</p>
                                    </div>
                                </div>

                                {['Packed', 'Dispatched', 'On its way', 'Delivered'].includes(order.status) && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                            <FaBox className="text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold">Packed</p>
                                            <p className="text-sm text-gray-500">Your products have been carefully packed.</p>
                                        </div>
                                    </div>
                                )}

                                {['Dispatched', 'On its way', 'Delivered'].includes(order.status) && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                            <FaTruck className="text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold">Dispatched</p>
                                            <p className="text-sm text-gray-500">Package handed over to our delivery partner.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="font-bold mb-4">Delivery Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                    <div>
                                        <p className="text-gray-400">Customer</p>
                                        <p className="font-medium">{order.customerName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Total Price</p>
                                        <p className="font-medium text-[#D4AF37]">PKR {order.totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-gray-400">Address</p>
                                        <p className="font-medium">{order.deliveryAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
