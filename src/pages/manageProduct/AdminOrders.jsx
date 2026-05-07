import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import Swal from 'sweetalert2';
import { FaEdit, FaTruck, FaBox, FaClock, FaCheckCircle } from 'react-icons/fa';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/orders`);
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, currentStatus) => {
        const { value: newStatus } = await Swal.fire({
            title: 'Update Order Status',
            input: 'select',
            inputOptions: {
                'Pending': 'Pending',
                'Packed': 'Packed',
                'Dispatched': 'Dispatched',
                'On its way': 'On its way',
                'Delivered': 'Delivered'
            },
            inputValue: currentStatus,
            showCancelButton: true,
            confirmButtonColor: '#D4AF37',
        });

        if (newStatus) {
            try {
                const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                if (res.ok) {
                    Swal.fire('Updated!', `Order status changed to ${newStatus}`, 'success');
                    fetchOrders();
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to update status', 'error');
            }
        }
    };

    const getStatusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ";
        switch (status) {
            case 'Pending': return <span className={base + "bg-amber-100 text-amber-600"}>Pending</span>;
            case 'Packed': return <span className={base + "bg-blue-100 text-blue-600"}>Packed</span>;
            case 'Dispatched': return <span className={base + "bg-purple-100 text-purple-600"}>Dispatched</span>;
            case 'On its way': return <span className={base + "bg-indigo-100 text-indigo-600"}>On Its Way</span>;
            case 'Delivered': return <span className={base + "bg-green-100 text-green-600"}>Delivered</span>;
            default: return <span className={base + "bg-gray-100 text-gray-600"}>{status}</span>;
        }
    };

    if (loading) return <div className="p-20 text-center">Loading orders...</div>;

    return (
        <div className="p-8 bg-gray-50 dark:bg-[#0A0A0A] min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">Manage <span className="text-[#D4AF37]">Orders</span></h1>
                    <p className="text-gray-500">{orders.length} Total Orders</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 uppercase text-xs font-bold tracking-widest">
                                    <th className="px-6 py-4">Tracking ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-bold text-[#D4AF37]">{order.trackingId || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold">{order.customerName}</p>
                                            <p className="text-xs text-gray-500">{order.customerPhone}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold">PKR {order.totalPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => updateStatus(order._id, order.status)}
                                                className="bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37] hover:text-white p-2 rounded-lg transition-all"
                                            >
                                                <FaEdit />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
