import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import Swal from 'sweetalert2';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const AdminSettings = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', influencer: '', usageLimit: '' });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'
    const [influencerSearch, setInfluencerSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, couponsRes, ordersRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/settings`),
                    fetch(`${API_BASE_URL}/coupons`),
                    fetch(`${API_BASE_URL}/orders`)
                ]);
                const settingsData = await settingsRes.json();
                const couponsData = await couponsRes.json();
                const ordersData = await ordersRes.json();
                setAnnouncements(settingsData.texts || []);
                setCoupons(couponsData || []);
                setOrders(ordersData || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleUpdateAnnouncements = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/settings`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ texts: announcements })
            });
            if (res.ok) {
                Swal.fire('Success', 'Announcement bar updated!', 'success');
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to update announcements', 'error');
        }
    };

    const addAnnouncement = () => {
        if (!newAnnouncement) return;
        setAnnouncements([...announcements, newAnnouncement]);
        setNewAnnouncement('');
    };

    const removeAnnouncement = (index) => {
        setAnnouncements(announcements.filter((_, i) => i !== index));
    };

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/coupons`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newCoupon)
            });
            const data = await res.json();
            if (data.insertedId) {
                setCoupons([...coupons, { ...newCoupon, _id: data.insertedId, usedCount: 0, isActive: true }]);
                setNewCoupon({ code: '', discount: '', influencer: '', usageLimit: '' });
                Swal.fire('Success', 'Coupon added!', 'success');
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to add coupon', 'error');
        }
    };

    const handleToggleCoupon = async (id, currentStatus) => {
        try {
            const res = await fetch(`${API_BASE_URL}/coupons/${id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            if (res.ok) {
                setCoupons(coupons.map(c => c._id === id ? { ...c, isActive: !currentStatus } : c));
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to update coupon status', 'error');
        }
    };

    const getInfluencerStats = (influencerName) => {
        if (!influencerName) return null;
        
        const influencerOrders = orders.filter(order => 
            order.influencerName?.toLowerCase() === influencerName.toLowerCase() ||
            order.promoCode?.toLowerCase().includes(influencerName.toLowerCase())
        );

        const totalOrders = influencerOrders.length;
        const totalProducts = influencerOrders.reduce((sum, order) => 
            sum + order.items.reduce((itemSum, item) => itemSum + (item.quantity || 1), 0), 0
        );
        const totalSales = influencerOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        const totalDiscount = influencerOrders.reduce((sum, order) => sum + (order.discountAmount || 0), 0);

        return { totalOrders, totalProducts, totalSales, totalDiscount };
    };

    const filteredCoupons = coupons.filter(coupon => 
        (activeTab === 'active' ? coupon.isActive : !coupon.isActive) &&
        (coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
         coupon.influencer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const stats = influencerSearch ? getInfluencerStats(influencerSearch) : null;

    if (loading) return <div className="p-10 text-center">Loading settings...</div>;

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-8">Admin <span className="text-[#D4AF37]">Settings</span></h1>

                {/* Announcement Bar Section */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📢 Announcement Bar</h2>
                    <div className="flex gap-2 mb-4">
                        <input 
                            type="text" 
                            value={newAnnouncement}
                            onChange={(e) => setNewAnnouncement(e.target.value)}
                            placeholder="Add moving text..."
                            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button onClick={addAnnouncement} className="bg-[#D4AF37] text-white p-3 rounded-xl hover:bg-black transition-all">
                            <FaPlus />
                        </button>
                    </div>
                    <ul className="space-y-2 mb-4">
                        {announcements.map((text, i) => (
                            <li key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                <span>{text}</span>
                                <button onClick={() => removeAnnouncement(i)} className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleUpdateAnnouncements} className="w-full py-3 bg-black dark:bg-white dark:text-black text-white font-bold rounded-xl hover:bg-[#D4AF37] transition-all">
                        Save Announcements
                    </button>
                </div>

                {/* Coupons Section */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">🎫 Manage Coupons & Influencers</h2>
                        
                        {/* Influencer Search Analysis */}
                        <div className="relative w-full md:w-72">
                            <input 
                                type="text" 
                                placeholder="🔍 Search Influencer Stats..." 
                                value={influencerSearch}
                                onChange={(e) => setInfluencerSearch(e.target.value)}
                                className="w-full bg-amber-50 dark:bg-amber-900/10 border border-[#D4AF37]/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
                            />
                            {stats && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-[#D4AF37]/20 z-20">
                                    <h4 className="font-bold text-[#D4AF37] mb-2">Performance: {influencerSearch}</h4>
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                                            <p className="text-gray-400">Orders</p>
                                            <p className="font-bold text-lg">{stats.totalOrders}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                                            <p className="text-gray-400">Products Sold</p>
                                            <p className="font-bold text-lg text-green-600">{stats.totalProducts}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                                            <p className="text-gray-400">Total Sales</p>
                                            <p className="font-bold">PKR {stats.totalSales.toFixed(0)}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                                            <p className="text-gray-400">Discounts Given</p>
                                            <p className="font-bold text-red-500">PKR {stats.totalDiscount.toFixed(0)}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setInfluencerSearch('')} className="w-full mt-3 text-[10px] text-gray-400 uppercase font-bold hover:text-red-500">Close Analysis</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleAddCoupon} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <input 
                            type="text" 
                            placeholder="Code (e.g. JOE10)" 
                            value={newCoupon.code}
                            onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2"
                            required
                        />
                        <input 
                            type="number" 
                            placeholder="Discount %" 
                            value={newCoupon.discount}
                            onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2"
                            required
                        />
                        <input 
                            type="text" 
                            placeholder="Influencer Name" 
                            value={newCoupon.influencer}
                            onChange={(e) => setNewCoupon({...newCoupon, influencer: e.target.value})}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2"
                            required
                        />
                        <input 
                            type="number" 
                            placeholder="Usage Limit" 
                            value={newCoupon.usageLimit}
                            onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2"
                            required
                        />
                        <button type="submit" className="bg-[#D4AF37] text-white font-bold rounded-xl hover:bg-black transition-all">
                            Add Promo
                        </button>
                    </form>

                    {/* Tabs & Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
                            <button 
                                onClick={() => setActiveTab('active')}
                                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'active' ? 'bg-white dark:bg-gray-700 shadow-sm text-[#D4AF37]' : 'text-gray-500'}`}
                            >
                                Active Codes
                            </button>
                            <button 
                                onClick={() => setActiveTab('history')}
                                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'history' ? 'bg-white dark:bg-gray-700 shadow-sm text-[#D4AF37]' : 'text-gray-500'}`}
                            >
                                History
                            </button>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Filter list..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-b border-gray-200 dark:border-gray-700 px-4 py-1 text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800 text-sm text-gray-500">
                                    <th className="py-2">Code</th>
                                    <th className="py-2">Discount</th>
                                    <th className="py-2">Influencer</th>
                                    <th className="py-2">Usage (Used/Limit)</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoupons.length > 0 ? (
                                    filteredCoupons.map((coupon) => (
                                        <tr key={coupon._id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                            <td className="py-3 font-bold text-[#D4AF37]">{coupon.code}</td>
                                            <td className="py-3">{coupon.discount}%</td>
                                            <td className="py-3">{coupon.influencer}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${coupon.usedCount >= coupon.usageLimit ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                    {coupon.usedCount || 0} / {coupon.usageLimit}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <button 
                                                    onClick={() => handleToggleCoupon(coupon._id, coupon.isActive)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${coupon.isActive ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}`}
                                                >
                                                    {coupon.isActive ? 'Active' : 'Disabled'}
                                                </button>
                                            </td>
                                            <td className="py-3 text-right">
                                                <button onClick={() => handleDeleteCoupon(coupon._id)} className="text-red-400 hover:text-red-600 p-2 transition-colors">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-10 text-center text-gray-400 italic">No coupons found in this section.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
