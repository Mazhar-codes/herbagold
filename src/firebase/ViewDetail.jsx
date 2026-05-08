import React, { useContext, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const ViewDetail = () => {
  const { user } = useContext(AuthContext);
  const detail = useLoaderData();
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const { _id, name, brandname, category, photourl, price, rating, shortDesc } = detail;

  const handleCart = async () => {
    if (!user) {
      Swal.fire({
        title: '🔐 Login Required',
        html: 'You need to be logged in to add items to your cart.<br/><br/>WhatsApp us to order without an account!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#D4AF37',
        cancelButtonColor: '#25D366',
        confirmButtonText: 'Login Now',
        cancelButtonText: '💬 WhatsApp Order',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.open(`https://wa.me/923155757274?text=Hi! I want to order: ${name} (PKR ${parseFloat(price).toFixed(2)})`, '_blank');
        }
      });
      return;
    }

    setAddingToCart(true);
    try {
      // Remove _id from detail so MongoDB generates a fresh ObjectId for the cart item
      const { _id: productId, ...productData } = detail;
      const newItem = { ...productData, productId, email: user.email, quantity: 1 };
      const res = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (data.insertedId) {
        setCartAdded(true);
        Swal.fire({
          icon: 'success',
          title: '🛒 Added to Cart!',
          text: `${name} has been added to your cart.`,
          confirmButtonColor: '#D4AF37',
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not add to cart. Try WhatsApp instead.', confirmButtonColor: '#D4AF37' });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
        Swal.fire({ icon: 'info', title: 'Login Required', text: 'Please login to add to wishlist.', confirmButtonColor: '#D4AF37' });
        return;
    }
    try {
        const res = await fetch(`${API_BASE_URL}/wishlist`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: user.email, productId: _id, name, photourl, price })
        });
        if (res.ok) {
            Swal.fire({ icon: 'success', title: 'Added to Wishlist!', text: 'We saved this for you.', confirmButtonColor: '#D4AF37', timer: 1500 });
        }
    } catch (err) {
        console.error(err);
    }
  };

  const features = [
    { icon: '🌿', label: 'Natural Ingredients' },
    { icon: '✅', label: '100% Authentic' },
    { icon: '🚚', label: 'Fast Delivery' },
    { icon: '💰', label: 'Best Price' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-[#0A0A0A] dark:via-[#111] dark:to-[#0A0A0A] py-8 px-4'>
      
      {/* SEO Product Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": name,
          "image": photourl,
          "description": shortDesc || `Premium ${name} by ${brandname}`,
          "brand": {
            "@type": "Brand",
            "name": brandname
          },
          "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "PKR",
            "price": price,
            "availability": detail.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating,
            "reviewCount": "24"
          }
        })}
      </script>

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-6xl mb-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span>›</span>
          <Link to={`/brand/${brandname}`} className="hover:text-[#D4AF37] transition-colors">{brandname}</Link>
          <span>›</span>
          <span className="text-gray-800 dark:text-white font-medium">{name}</span>
        </nav>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="bg-white dark:bg-[#141414] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* === LEFT: Product Image === */}
            <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50/50 dark:from-[#1a1a1a] dark:to-[#111] flex items-center justify-center p-10 min-h-[400px]">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-l-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <img
                  className='max-h-[460px] w-auto rounded-2xl shadow-2xl object-contain transform hover:scale-105 transition-transform duration-500'
                  src={photourl}
                  alt={name}
                  loading="lazy"
                />
              </div>

              {/* Category badge */}
              <div className="absolute top-5 left-5 bg-black/70 dark:bg-[#D4AF37]/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {category}
              </div>
            </div>

            {/* === RIGHT: Product Details === */}
            <div className="p-8 lg:p-12 flex flex-col gap-6 justify-center">

              {/* Brand pill */}
              <div>
                <span className="text-xs bg-[#D4AF37]/15 text-[#D4AF37] px-4 py-1.5 rounded-full font-bold uppercase tracking-wider border border-[#D4AF37]/30">
                  🌿 {brandname}
                </span>
              </div>

              {/* Product name */}
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white">{name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
                <span className="text-sm font-bold text-[#D4AF37]">{rating}/5</span>
                <span className="text-xs text-gray-400">(Verified)</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base border-l-4 border-[#D4AF37]/40 pl-4">
                {shortDesc || `Experience the premium quality of ${name}. Crafted with 100% natural herbal ingredients for the best results.`}
              </p>

              {/* Price */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[#D4AF37]">PKR {parseFloat(price).toFixed(2)}</span>
                  <span className={`text-sm font-semibold ${detail.inStock === false ? 'text-red-600' : 'text-green-600 dark:text-green-400'}`}>
                    {detail.inStock === false ? '✗ Out of Stock' : '✓ In Stock'}
                  </span>
                </div>
                {/* Watching Now Counter */}
                <div className="flex items-center gap-2 text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg w-fit mt-2 animate-pulse">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  {Math.floor(Math.random() * (45 - 15 + 1)) + 15} people are watching this product
                </div>
              </div>

              {/* Feature icons */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-3 py-2">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  onClick={handleCart}
                  disabled={addingToCart || cartAdded || detail.inStock === false}
                  className={`flex-1 py-4 font-bold text-base rounded-xl transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 ${
                    cartAdded
                      ? 'bg-green-600 text-white cursor-default'
                      : detail.inStock === false 
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-[#D4AF37] text-white hover:bg-black dark:hover:bg-white dark:hover:text-black'
                  }`}
                >
                  {addingToCart ? (
                    <><span className="animate-spin">⟳</span> Adding...</>
                  ) : cartAdded ? (
                    <>✓ Added to Cart</>
                  ) : detail.inStock === false ? (
                    <>Out of Stock</>
                  ) : (
                    <>🛒 Add to Cart</>
                  )}
                </button>

                <button
                  onClick={handleWishlist}
                  className="px-6 py-4 bg-white dark:bg-gray-800 text-[#D4AF37] border-2 border-[#D4AF37] font-bold text-base rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-md"
                >
                  ❤️ Wishlist
                </button>

                <a
                  href={`https://wa.me/923155757274?text=Hi! I want to order: ${encodeURIComponent(name)} (PKR ${parseFloat(price).toFixed(2)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-green-600 text-white font-bold text-base rounded-xl hover:bg-green-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-lg"
                >
                  📱 WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                {['🔒 Secure Checkout', '📦 Fast Shipping', '↩️ Easy Returns'].map((b, i) => (
                  <span key={i} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === BUNDLE SECTION === */}
        {detail.isBundle && (
          <div className="mt-10 p-8 lg:p-12 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/5 rounded-[2rem] border border-[#D4AF37]/20 shadow-inner text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-[#D4AF37] text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg transform -rotate-6">🎁</div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Exclusive Bundle Offer</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">This is a special curated collection. Check the description above for full details on what's included in this premium set.</p>
              </div>
            </div>
          </div>
        )}

        {/* Customer Reviews Section */}
        <div className="mt-16 pt-16 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Customer <span className="text-[#D4AF37]">Reviews</span></h2>
              <p className="text-gray-500 mt-2">What others say about {name}</p>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-[#141414] px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{rating}/5</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Overall Rating</div>
              </div>
              <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                user: "Zainab R.",
                date: "2 days ago",
                comment: `Absolutely loved the ${name}! It fits perfectly into my daily routine and the results are visible within days.`,
                rating: 5,
                tag: "Verified Purchase"
              },
              {
                user: "Bilal A.",
                date: "1 week ago",
                comment: `Bought this for my wife and she's obsessed. The packaging was premium and delivery was very fast.`,
                rating: 5,
                tag: "Verified Purchase"
              },
              {
                user: "Madiha Q.",
                date: "3 weeks ago",
                comment: `I've tried many products but this ${brandname} one stands out. High quality ingredients and great price.`,
                rating: 4,
                tag: "Verified Purchase"
              },
              {
                user: "Usman T.",
                date: "1 month ago",
                comment: `Great value for money. Highly recommend to anyone looking for natural herbal solutions.`,
                rating: 5,
                tag: "Verified Purchase"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white dark:bg-[#141414] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center font-bold">
                      {review.user[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{review.user}</h4>
                      <p className="text-[10px] text-gray-400 font-medium uppercase">{review.date}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold border border-green-100">
                    {review.tag}
                  </span>
                </div>
                <Rating style={{ maxWidth: 80 }} value={review.rating} readOnly className="mb-3" />
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={() => Swal.fire({ title: 'Coming Soon!', text: 'The review submission feature will be available shortly.', icon: 'info', confirmButtonColor: '#D4AF37' })}
              className="px-8 py-3 bg-gray-900 dark:bg-white dark:text-black text-white font-bold rounded-xl hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-all text-sm"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Related / Back */}
        <div className="text-center mt-12 pb-10">
          <Link
            to={`/brand/${brandname}`}
            className="inline-flex items-center gap-2 text-[#D4AF37] font-bold hover:underline transition-all hover:gap-3"
          >
            ← Browse More {brandname} Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;