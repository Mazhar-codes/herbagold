import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import Swal from 'sweetalert2';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

const Update = () => {
    const oneproduct = useLoaderData();
    const { _id, name, brandname, category, photourl, price, rating, shortDesc, isBundle: initialIsBundle } = oneproduct;
    const [uploading, setUploading] = useState(false);
    const [inStock, setInStock] = useState(oneproduct.inStock !== false);
    const [isBundle, setIsBundle] = useState(oneproduct.isBundle === true || oneproduct.isBundle === 'true');

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        setUploading(true);
        try {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1024,
                useWebWorker: true
            };

            Swal.fire({
                title: 'Compressing...',
                text: 'Optimizing your image',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            const compressedFile = await imageCompression(imageFile, options);
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('upload_preset', 'ml_default');

            const response = await axios.post(`https://api.cloudinary.com/v1_1/dbjnnflrz/image/upload`, formData);
            
            if (response.data.secure_url) {
                const url = response.data.secure_url;
                document.getElementsByName('photourl')[0].value = url;
                Swal.fire('Success!', 'Image optimized and uploaded to Cloudinary.', 'success');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to process image', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const brandname = form.brandname.value;
        const category = form.category.value;
        const photourl = form.photourl.value;
        const price = form.price.value;
        const rating = form.rating.value;
        const shortDesc = form.shortDesc.value;
        const inStockVal = inStock; // Use state instead of form.inStock.checked

        const updateProduct = { 
            name, 
            brandname, 
            category, 
            photourl, 
            price: parseFloat(price), 
            rating: parseFloat(rating), 
            shortDesc, 
            inStock: !!inStock, 
            isBundle: !!isBundle
        };

        console.log('Sending update:', updateProduct);

        fetch(`${API_BASE_URL}/brand/update/${_id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateProduct)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Product has been updated successfully.',
                    icon: 'success',
                    confirmButtonColor: '#D4AF37'
                });
            } else {
                Swal.fire({
                    title: 'No Changes',
                    text: 'You didn\'t change anything.',
                    icon: 'info',
                    confirmButtonColor: '#D4AF37'
                });
            }
        });
    };

    return (
        <div className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-[#0A0A0A]">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-10">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Admin Panel</span>
                    <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">Update <span className="text-[#D4AF37]">Product</span></h2>
                    <p className="text-gray-500 mt-2">Editing: {name}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                    <form onSubmit={handleUpdate} className='flex flex-col gap-5'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            <div className="form-control">
                                <label className="text-sm font-bold mb-1 text-gray-500">Product Name</label>
                                <input type="text" name="name" defaultValue={name} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required />
                            </div>
                            <div className="form-control">
                                <label className="text-sm font-bold mb-1 text-gray-500">Brand</label>
                                <select name="brandname" defaultValue={brandname} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required>
                                    <option value="HERBA GOLD">HERBA GOLD</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Category</label>
                            <select name="category" defaultValue={category} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required>
                                <option value="Hair Care">Hair Care</option>
                                <option value="Skin Care">Skin Care</option>
                                <option value="Face Care">Face Care</option>
                                <option value="Body Care">Body Care</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Product Image</label>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1">
                                    <input type="text" name="photourl" defaultValue={photourl} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required />
                                </div>
                                <div className="relative">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageUpload} 
                                        className="hidden" 
                                        id="fileUpload" 
                                        disabled={uploading}
                                    />
                                    <label 
                                        htmlFor="fileUpload" 
                                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold cursor-pointer transition-all ${uploading ? 'bg-gray-300' : 'bg-black text-white hover:bg-[#D4AF37]'}`}
                                    >
                                        {uploading ? 'Processing...' : 'Upload File'}
                                    </label>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1 italic">* Images are automatically compressed to keep your site fast.</p>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            <div className="form-control">
                                <label className="text-sm font-bold mb-1 text-gray-500">Rating (1-5)</label>
                                <input type="number" name="rating" min="1" max="5" step="0.1" defaultValue={rating} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required />
                            </div>
                            <div className="form-control">
                                <label className="text-sm font-bold mb-1 text-gray-500">Price (PKR)</label>
                                <input type="text" name="price" defaultValue={price} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Short Description</label>
                            <textarea name="shortDesc" defaultValue={shortDesc} rows="3" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required></textarea>
                        </div>

                        <div className="form-control flex flex-row items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 cursor-pointer" onClick={() => setInStock(!inStock)}>
                            <input 
                                type="checkbox" 
                                id="inStock" 
                                name="inStock" 
                                checked={inStock}
                                onChange={(e) => setInStock(e.target.checked)}
                                className="w-5 h-5 accent-[#D4AF37]" 
                            />
                            <label htmlFor="inStock" className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer">Product is In Stock</label>
                        </div>

                        <div className="form-control flex flex-row items-center gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl px-4 py-3 cursor-pointer" onClick={() => setIsBundle(!isBundle)}>
                            <input 
                                type="checkbox" 
                                id="isBundle" 
                                checked={isBundle}
                                onChange={(e) => setIsBundle(e.target.checked)} 
                                className="w-5 h-5 accent-[#D4AF37]" 
                            />
                            <label htmlFor="isBundle" className="text-sm font-bold text-[#D4AF37] cursor-pointer">This is a Bundle Offer</label>
                        </div>

                        <button type="submit" className='w-full py-4 bg-[#D4AF37] text-white font-bold text-lg rounded-xl hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg mt-4'>
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;