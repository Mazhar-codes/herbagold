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
    const [galleryUploading, setGalleryUploading] = useState(false);
    const [inStock, setInStock] = useState(oneproduct.inStock !== false);
    const [isBundle, setIsBundle] = useState(oneproduct.isBundle === true || oneproduct.isBundle === 'true');
    const [photoUrl, setPhotoUrl] = useState(photourl);
    const [gallery, setGallery] = useState(oneproduct.gallery || []);

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
                setPhotoUrl(url); // Update state instead of DOM directly
                Swal.fire('Success!', 'Image optimized and uploaded to Cloudinary.', 'success');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to process image', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setGalleryUploading(true);
        Swal.fire({
            title: 'Uploading Gallery...',
            text: `Processing ${files.length} images...`,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const newGalleryUrls = [];
        const options = { maxSizeMB: 0.4, maxWidthOrHeight: 1024, useWebWorker: true };

        try {
            for (const file of files) {
                const compressedFile = await imageCompression(file, options);
                const formData = new FormData();
                formData.append('file', compressedFile);
                formData.append('upload_preset', 'ml_default');

                const response = await axios.post(`https://api.cloudinary.com/v1_1/dbjnnflrz/image/upload`, formData);
                if (response.data.secure_url) {
                    newGalleryUrls.push(response.data.secure_url);
                }
            }
            setGallery([...gallery, ...newGalleryUrls]);
            Swal.fire('Success!', `${newGalleryUrls.length} gallery images uploaded.`, 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Some gallery images failed to upload', 'error');
        } finally {
            setGalleryUploading(false);
        }
    };

    const removeGalleryImage = (index) => {
        setGallery(gallery.filter((_, i) => i !== index));
    };

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;

        const updateProduct = { 
            name: form.name.value, 
            brandname: form.brandname.value, 
            category: form.category.value, 
            photourl: photoUrl, 
            price: parseFloat(form.price.value), 
            rating: parseFloat(form.rating.value), 
            shortDesc: form.shortDesc.value, 
            inStock: !!inStock, 
            isBundle: !!isBundle,
            gallery
        };

        console.log('Sending update:', updateProduct);

        fetch(`${API_BASE_URL}/brand/update/${_id?.toString() || _id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateProduct)
        })
        .then(res => res.json().then(data => ({ status: res.status, data })))
        .then(({ status, data }) => {
            if (data.success || data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Product and gallery have been updated successfully.',
                    icon: 'success',
                    confirmButtonColor: '#D4AF37'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.error || 'Could not find product to update.',
                    icon: 'error',
                    footer: `ID: ${_id?.toString() || _id} | Status: ${status}`,
                    confirmButtonColor: '#D4AF37'
                });
            }
        })
        .catch(err => {
            Swal.fire('Network Error', err.message, 'error');
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
                            <label className="text-sm font-bold mb-1 text-gray-500">Main Product Image (Thumbnail)</label>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1">
                                    <input 
                                        type="text" 
                                        name="photourl" 
                                        value={photoUrl} 
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" 
                                        required 
                                    />
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
                                        {uploading ? 'Processing...' : 'Upload Main'}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Product Gallery (Side Pictures)</label>
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                    {gallery.map((url, index) => (
                                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#D4AF37] cursor-pointer transition-colors bg-white dark:bg-gray-900">
                                        <input type="file" multiple accept="image/*" onChange={handleGalleryUpload} className="hidden" disabled={galleryUploading} />
                                        <span className="text-2xl text-gray-400">+</span>
                                        <span className="text-[10px] text-gray-400 uppercase font-bold">Add</span>
                                    </label>
                                </div>
                                <p className="text-[10px] text-gray-400 italic">Manage the side pictures for this product.</p>
                            </div>
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