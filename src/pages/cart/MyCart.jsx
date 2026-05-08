import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import CartCard from './CartCard';
import { API_BASE_URL } from '../../config';
import Swal from 'sweetalert2';
import { FaWhatsapp, FaTicketAlt, FaClock } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const MyCart = () => {
   const [cart, setCart] = useState([]);
   const [quantities, setQuantities] = useState({});
   const [orderLoading, setOrderLoading] = useState(false);
   const [couponCode, setCouponCode] = useState('');
   const [appliedCoupon, setAppliedCoupon] = useState(null);
   const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
   const { user } = useContext(AuthContext);

   // Timer logic
   useEffect(() => {
       const timer = setInterval(() => {
           setTimeLeft((prev) => (prev <= 1 ? 600 : prev - 1));
       }, 1000);
       return () => clearInterval(timer);
   }, []);

   const formatTime = (seconds) => {
       const mins = Math.floor(seconds / 60);
       const secs = seconds % 60;
       return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
   };

   useEffect(() => {
       if (user?.email) {
           fetch(`${API_BASE_URL}/cart/${encodeURIComponent(user.email)}`)
               .then(res => res.json())
               .then(data => {
                   setCart(data);
                   // Initialize quantities from stored value or default to 1
                   const initQty = {};
                   data.forEach(item => {
                       initQty[item._id] = item.quantity || 1;
                   });
                   setQuantities(initQty);
               })
               .catch(err => console.error('Cart fetch error:', err));
       }
   }, [user]);

   const handleQuantityChange = async (itemId, newQty) => {
       if (newQty < 1) return;
       setQuantities(prev => ({ ...prev, [itemId]: newQty }));
       // Persist quantity to backend
       try {
           await fetch(`${API_BASE_URL}/cart/${itemId}`, {
               method: 'PATCH',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ quantity: newQty })
           });
       } catch (e) {
           console.warn('Could not persist quantity:', e);
       }
   };

   const subTotal = cart.reduce((sum, item) => {
       const qty = quantities[item._id] || 1;
       return sum + (parseFloat(item.price) || 0) * qty;
   }, 0);

   const discountAmount = appliedCoupon ? (subTotal * (appliedCoupon.discount / 100)) : 0;
   const totalPrice = subTotal - discountAmount;

   const totalItems = cart.reduce((sum, item) => sum + (quantities[item._id] || 1), 0);

   const handlePlaceOrder = async () => {
       if (cart.length === 0) {
           Swal.fire('Cart Empty', 'Please add items to your cart first.', 'warning');
           return;
       }

       const { value: formValues } = await Swal.fire({
           title: '📦 Complete Your Order',
           html:
               '<input id="swal-name" class="swal2-input" placeholder="Full Name (e.g. Ahmed Khan)" required>' +
               '<input id="swal-phone" class="swal2-input" placeholder="Phone (e.g. 03001234567)" required>' +
               '<select id="swal-city" class="swal2-select" style="display: flex; width: 80%; margin: 1em auto;">' +
                   '<option value="" disabled selected>Select Your City</option>' +
                   '<option value="Islamabad">Islamabad</option>' +
                   '<option value="Rawalpindi">Rawalpindi</option>' +
                   '<option value="Lahore">Lahore</option>' +
                   '<option value="Karachi">Karachi</option>' +
                   '<option value="Faisalabad">Faisalabad</option>' +
                   '<option value="Multan">Multan</option>' +
                   '<option value="Peshawar">Peshawar</option>' +
                   '<option value="Quetta">Quetta</option>' +
                   '<option value="Sialkot">Sialkot</option>' +
                   '<option value="Gujranwala">Gujranwala</option>' +
                   '<option value="Others">Other Cities</option>' +
               '</select>' +
               '<input id="swal-address" class="swal2-input" placeholder="Detailed Address (House#, Street#)" required>' +
               '<textarea id="swal-notes" class="swal2-textarea" placeholder="Any notes (optional)"></textarea>',
           focusConfirm: false,
           showCancelButton: true,
           confirmButtonText: '✨ Place Order',
           confirmButtonColor: '#D4AF37',
           cancelButtonColor: '#6b7280',
           preConfirm: () => {
               const name = document.getElementById('swal-name').value.trim();
               const phone = document.getElementById('swal-phone').value.trim();
               const city = document.getElementById('swal-city').value;
               const address = document.getElementById('swal-address').value.trim();
               const notes = document.getElementById('swal-notes').value.trim();

               if (!name || name.length < 3) {
                   Swal.showValidationMessage('❌ Please enter your full name');
                   return false;
               }
               if (!phone) {
                   Swal.showValidationMessage('❌ Please enter your phone number');
                   return false;
               }
               if (!city) {
                   Swal.showValidationMessage('❌ Please select your city');
                   return false;
               }
               if (!address || address.length < 5) {
                   Swal.showValidationMessage('❌ Please enter your full delivery address');
                   return false;
               }

               return { name, phone, city, address, notes };
           }
       });

       if (formValues) {
           setOrderLoading(true);
           try {
               const city = document.getElementById('swal-city').value;
               const shippingFee = (city === 'Islamabad' || city === 'Rawalpindi') ? 250 : 300;
               
               const orderData = {
                   customerName: formValues.name,
                   customerEmail: user.email,
                   customerPhone: formValues.phone,
                   city: formValues.city,
                   deliveryAddress: formValues.address,
                   notes: formValues.notes,
                   items: cart.map(item => ({
                       name: item.name,
                       price: item.price,
                       quantity: quantities[item._id] || 1,
                       subtotal: parseFloat(item.price) * (quantities[item._id] || 1),
                       productId: item.productId || item._id
                   })),
                   shippingFee: shippingFee,
                   totalPrice: totalPrice + shippingFee,
                   totalItems: totalItems,
                   promoCode: appliedCoupon?.code,
                   influencerName: appliedCoupon?.influencer,
                   discountAmount: discountAmount,
                   orderDate: new Date().toISOString()
               };

               const res = await fetch(`${API_BASE_URL}/orders`, {
                   method: 'POST',
                   headers: { 'content-type': 'application/json' },
                   body: JSON.stringify(orderData)
               });
               const data = await res.json();
               if (data.success) {
                    const trackingId = data.trackingId;

                    Swal.fire({
                        icon: 'success',
                        title: 'Order Placed! 🎉',
                        html: `<div class="text-center">
                                <p class="mb-4 text-gray-600">Your order has been placed successfully!</p>
                                <div class="bg-gray-50 p-6 rounded-2xl mb-4 border-2 border-dashed border-[#D4AF37]/30">
                                    <p class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Your Tracking ID</p>
                                    <p class="text-3xl font-mono font-bold text-[#D4AF37]">${trackingId}</p>
                                </div>
                                <p class="text-sm text-gray-500 italic">📧 A confirmation email has been sent to your inbox.</p>
                                <p class="text-xs text-gray-400 mt-3 font-medium">Please save this ID to track your order status.</p>
                               </div>`,
                        confirmButtonColor: '#D4AF37'
                    });
                   // Clear cart from server
                   for (const item of cart) {
                       try {
                           await fetch(`${API_BASE_URL}/cart/${item._id}`, { method: 'DELETE' });
                       } catch (e) { /* ignore */ }
                   }
                   setCart([]);
                   setQuantities({});
               } else {
                   Swal.fire('Error', data.error || 'Failed to place order. Please try again.', 'error');
               }
           } catch (err) {
               console.error(err);
               Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
           } finally {
               setOrderLoading(false);
           }
       }
   };

   return (
       <div className='min-h-[70vh] py-10 px-4 bg-gray-50 dark:bg-[#0A0A0A]'>
           <div className="container mx-auto max-w-4xl">
               <h1 className="text-4xl font-bold text-center mb-2">My <span className="text-[#D4AF37]">Cart</span></h1>
               <p className="text-center text-gray-500 mb-10">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>

               {cart.length !== 0 ? (
                   <>
                       <div className="flex flex-col gap-4">
                           {cart.map(detail => (
                               <CartCard
                                   cart={cart}
                                   setCart={setCart}
                                   key={detail._id}
                                   detail={detail}
                                   quantity={quantities[detail._id] || 1}
                                   onQuantityChange={(newQty) => handleQuantityChange(detail._id, newQty)}
                               />
                           ))}
                       </div>

                       {/* Psychological Offer Timer */}
                       <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex items-center justify-between animate-pulse">
                           <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                               <FaClock className="text-xl" />
                               <div>
                                   <p className="font-bold text-sm">Hurry! Your 25% discount offer expires in</p>
                                   <p className="text-xs opacity-80">This offer might end soon, complete your order now!</p>
                               </div>
                           </div>
                           <span className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">{formatTime(timeLeft)}</span>
                       </div>

                       {/* Order Summary */}
                       <div className="mt-8 bg-white dark:bg-[#141414] rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                           <h3 className="text-xl font-bold mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">Order Summary</h3>

                           {cart.map(item => (
                               <div key={item._id} className="flex justify-between text-sm mb-2">
                                   <span className="text-gray-600 dark:text-gray-400">
                                       {item.name} × {quantities[item._id] || 1}
                                   </span>
                                   <span className="font-medium">
                                       PKR {(parseFloat(item.price) * (quantities[item._id] || 1)).toFixed(2)}
                                   </span>
                               </div>
                           ))}

                           <div className="flex justify-between text-sm mb-2 mt-3">
                               <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                               <span className="font-medium">PKR {subTotal.toFixed(2)}</span>
                           </div>

                           <div className="flex justify-between text-sm mb-2">
                               <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                               <span className="font-bold text-gray-500">Calculated at checkout</span>
                           </div>

                           {appliedCoupon && (
                               <div className="flex justify-between text-sm mb-2 text-red-600 font-bold">
                                   <span>Discount ({appliedCoupon.code})</span>
                                   <span>- PKR {discountAmount.toFixed(2)}</span>
                               </div>
                           )}

                           {/* Promo Code Input */}
                           <div className="my-6">
                               <div className="flex flex-col sm:flex-row gap-2">
                                   <input 
                                       type="text" 
                                       placeholder="Promo Code" 
                                       value={couponCode}
                                       onChange={(e) => setCouponCode(e.target.value)}
                                       className="w-full sm:flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                                   />
                                   <button 
                                       onClick={async () => {
                                           if (!couponCode) return;
                                           try {
                                               const res = await fetch(`${API_BASE_URL}/validate-coupon/${couponCode}`);
                                               const data = await res.json();
                                               if (res.ok) {
                                                   setAppliedCoupon(data);
                                                   Swal.fire('Success', `Coupon ${data.code} applied!`, 'success');
                                               } else {
                                                   Swal.fire('Invalid', 'Coupon code not found', 'error');
                                               }
                                           } catch (e) {
                                               Swal.fire('Error', 'Could not validate coupon', 'error');
                                           }
                                       }}
                                       className="bg-black text-white px-4 py-2 rounded-xl hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
                                   >
                                       <FaTicketAlt /> Apply
                                   </button>
                               </div>
                               {appliedCoupon && <p className="text-xs text-green-600 mt-1 font-bold">✓ Coupon Applied: {appliedCoupon.discount}% OFF</p>}
                           </div>

                           <hr className="my-4 border-gray-200 dark:border-gray-700" />

                           <div className="flex justify-between items-baseline mb-1">
                               <span className="text-sm text-gray-500 line-through">PKR {(totalPrice / 0.75).toFixed(2)}</span>
                               <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">25% OFF</span>
                           </div>
                           <div className="flex justify-between text-2xl font-bold">
                               <span>Total</span>
                               <span className="text-[#D4AF37]">PKR {totalPrice.toFixed(2)}</span>
                           </div>

                           <button
                               onClick={handlePlaceOrder}
                               disabled={orderLoading}
                               className="w-full mt-6 py-4 bg-[#D4AF37] text-white font-bold text-lg rounded-xl hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                               {orderLoading ? '⏳ Placing Order...' : '✨ Place Order'}
                           </button>

                           <a
                               href="https://wa.me/923155757274"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="w-full mt-3 py-3 bg-green-600 text-white font-bold text-lg rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                           >
                               <FaWhatsapp className="text-xl" /> Order via WhatsApp
                           </a>
                       </div>
                   </>
               ) : (
                   <div className='flex flex-col justify-center items-center py-20'>
                       <div className="text-8xl mb-4">🛒</div>
                       <h2 className='text-3xl font-bold text-gray-300 dark:text-gray-600'>Your cart is empty</h2>
                       <p className="text-gray-400 mt-2">Browse our products and add items to your cart</p>
                       <a href="/brand/HERBA GOLD" className="mt-6 px-8 py-3 bg-[#D4AF37] text-white font-bold rounded-xl hover:bg-black transition-all">
                           Shop Now
                       </a>
                   </div>
               )}
           </div>
       </div>
   );
};

export default MyCart;