import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../config';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';

const ManageProduct = () => {
    const [products, setProducts] = useState(useLoaderData());
       
    const handleToggleStock = async (id, currentStatus) => {
        try {
            const res = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ inStock: !currentStatus })
            });
            if (res.ok) {
                setProducts(prev => prev.map(p => p._id === id ? { ...p, inStock: !currentStatus } : p));
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to update stock status', 'error');
        }
    };

    const handleDelete=_id=>{
        Swal.fire({
           title: 'Delete product?',
           text: "This action cannot be undone.",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#D4AF37',
           cancelButtonColor: '#999',
           confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
           if (result.isConfirmed) {
           fetch(`${API_BASE_URL}/products/${_id}`, {
               method: 'DELETE'
           })
           .then(res => res.json())
           .then(data => {
               if(data.deletedCount > 0){
                   setProducts(prevProducts => prevProducts.filter(product => product._id !== _id));
                   Swal.fire({
                       title: 'Deleted!',
                       text: 'Product has been removed.',
                       icon: 'success',
                       confirmButtonColor: '#D4AF37'
                   })
               }
           })
           }
         })
}
    return (
        <div className="min-h-screen py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-10">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Admin Panel</span>
                    <h2 className="text-3xl font-bold mt-2">Manage <span className="text-[#D4AF37]">Products</span></h2>
                    <p className="text-gray-500 mt-2">{products.length} product{products.length !== 1 ? 's' : ''} total</p>
                    <div className="flex justify-center gap-4 mt-6">
                        <Link to="/addproduct" className="px-6 py-2 bg-[#D4AF37] text-white font-bold rounded-full text-sm hover:bg-black transition-all">Add Product</Link>
                        <Link to="/admin/orders" className="px-6 py-2 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-full text-sm hover:bg-[#D4AF37] hover:text-white transition-all">Manage Orders 📦</Link>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-bold text-gray-300">No products yet</h3>
                        <Link to="/addproduct" className="inline-block mt-4 px-6 py-3 bg-[#D4AF37] text-white font-bold rounded-xl hover:bg-black transition-all">Add Your First Product</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow group">
                                <div className="h-48 overflow-hidden bg-gray-50">
                                    <img src={product.photourl} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-full font-bold">{product.brandname}</span>
                                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{product.category}</span>
                                        <button 
                                            onClick={() => handleToggleStock(product._id, product.inStock !== false)}
                                            className={`text-xs px-2 py-1 rounded-full font-bold transition-all hover:scale-105 ${product.inStock === false ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                                            title="Click to toggle stock status"
                                         >
                                             {product.inStock === false ? '✗ Out of Stock' : '✓ In Stock'}
                                         </button>
                                    </div>
                                    <p className="text-[#D4AF37] font-bold text-lg mb-4">PKR {parseFloat(product.price).toFixed(2)}</p>
                                    <div className="flex gap-2">
                                        <Link to={`/brand/update/${product._id}`} className="flex-1 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg text-center text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                                            <FaEdit /> Edit
                                        </Link>
                                        <Link to={`/viewDetail/${product._id}`} className="flex-1 py-2 bg-gray-50 dark:bg-gray-800 font-bold rounded-lg text-center text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
                                            <FaEye /> View
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className="flex-1 py-2 bg-red-50 text-red-500 font-bold rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProduct;
