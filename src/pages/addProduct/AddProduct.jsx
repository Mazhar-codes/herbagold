import React, { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from '../../config';
import imageCompression from 'browser-image-compression';


const AddProduct = () => {
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        setUploading(true);
        try {
            // Compression options
            const options = {
                maxSizeMB: 0.5, // Max 500KB
                maxWidthOrHeight: 1024,
                useWebWorker: true
            };

            Swal.fire({
                title: 'Compressing...',
                text: 'Optimizing your image for speed',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            const compressedFile = await imageCompression(imageFile, options);
            
            // Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('upload_preset', 'ml_default');

            const response = await axios.post(`https://api.cloudinary.com/v1_1/YOUR_NEW_CLOUD_NAME/image/upload`, formData); // Old: dbjnnflrz
            
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

    const handleAddProduct = event => {
        event.preventDefault()

        const form = event.target;

        const name = form.name.value;
        const brandname = form.brandname.value;
        const category = form.category.value;
        const photourl = form.photourl.value;
        const price = form.price.value;
        const rating = form.rating.value;
        const shortDesc = form.shortDesc.value;
        const inStock = form.inStock.checked;
       

        const newproduct = { name, brandname,category, photourl, price, rating, shortDesc, inStock};

        console.log(newproduct);

          //send data to the server
      fetch(`${API_BASE_URL}/products`,{
        method:'POST',
        headers :{
          'content-type':'application/json'
        },
        body : JSON.stringify(newproduct)
      })
      .then(res=>res.json())
      .then(data =>{
        console.log(data);
        if(data.insertedId){
            Swal.fire({
                title: 'Product Added!',
                text: 'Your product has been added successfully.',
                icon: 'success',
                confirmButtonColor: '#D4AF37'
            })
            form.reset();
        }
      })
    }

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-10">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Admin Panel</span>
                    <h2 className="text-3xl font-bold mt-2">Add <span className="text-[#D4AF37]">Product</span></h2>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                <form onSubmit={handleAddProduct} className='flex flex-col gap-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Product Name</label>
                            <input type="text" placeholder="e.g. HERBAGOLD SHAMPOO" name="name" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required />
                        </div>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Brand</label>
                            <select id="brandname" name="brandname" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required>
                                <option value="" disabled>Select Brand</option>
                                <option value="HERBA GOLD">HERBA GOLD</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-control">
                        <label className="text-sm font-bold mb-1 text-gray-500">Category</label>
                        <select id="category" name="category" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required>
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
                                <input 
                                    type="text" 
                                    placeholder="Paste image URL here" 
                                    name="photourl" 
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
                                    {uploading ? 'Processing...' : 'Upload File'}
                                </label>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 italic">* Images are automatically compressed to keep your site fast.</p>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Rating (1-5)</label>
                            <input type="number" placeholder="4.5" name="rating" min="1" max="5" step="0.1" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required />
                        </div>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Price (PKR)</label>
                            <input type="text" placeholder="1500" name="price" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required />
                        </div>
                    </div>
                    
                    <div className="form-control">
                        <label className="text-sm font-bold mb-1 text-gray-500">Short Description</label>
                        <textarea placeholder="Tell us about this product..." name="shortDesc" rows="3" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]" required></textarea>
                    </div>

                    <div className="form-control flex flex-row items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
                        <input type="checkbox" id="inStock" name="inStock" defaultChecked className="w-5 h-5 accent-[#D4AF37]" />
                        <label htmlFor="inStock" className="text-sm font-bold text-gray-700 dark:text-gray-300">Product is In Stock</label>
                    </div>

                    <button type="submit" className='w-full py-4 bg-[#D4AF37] text-white font-bold text-lg rounded-xl hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg mt-4'>
                        Add Product
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;