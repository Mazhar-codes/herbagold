
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faLinkedin, faSquareInstagram, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] text-gray-300 py-16 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand Column */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="HERBA GOLD" className="h-12 w-auto" />
                        <h1 className="text-3xl font-bold tracking-tighter text-white">HERBA <span className="text-[#D4AF37]">GOLD</span></h1>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Experience the gold standard of herbal beauty. Our products are crafted with premium natural ingredients to enhance your natural radiance.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-[#D4AF37] transition-colors"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
                        <a href="https://www.facebook.com/profile.php?id=61564777512252" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
                        <a href="https://www.instagram.com/herbagold.pk?igsh=MWVvajhjeWl3aXptMw==" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors"><FontAwesomeIcon icon={faSquareInstagram} size="lg" /></a>
                        <a href="https://wa.me/923155757274" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors"><FontAwesomeIcon icon={faWhatsapp} size="lg" /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 border-b border-[#D4AF37]/30 pb-2 w-fit">Quick Links</h3>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
                        <li><Link to="/track-order" className="hover:text-[#D4AF37] transition-colors font-bold">Track Order 📦</Link></li>
                        <li><Link to="/contactus" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
                        <li><Link to="/myCart" className="hover:text-[#D4AF37] transition-colors">My Cart</Link></li>
                        <li><Link to="/manageproduct" className="hover:text-[#D4AF37] transition-colors">Admin Panel</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 border-b border-[#D4AF37]/30 pb-2 w-fit">Contact</h3>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faEnvelope} className="text-[#D4AF37]" />
                            <span>supportherbagold072@gmail.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faPhone} className="text-[#D4AF37]" />
                            <span>+92 315 5757274</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faWhatsapp} className="text-[#D4AF37]" />
                            <a href="https://wa.me/923155757274" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp Support</a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 border-b border-[#D4AF37]/30 pb-2 w-fit">Newsletter</h3>
                    <p className="text-sm text-gray-400 mb-4">Subscribe for the latest updates and exclusive offers.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-[#D4AF37]" />
                        <button className="bg-[#D4AF37] text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors">Join</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} HERBA GOLD. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;