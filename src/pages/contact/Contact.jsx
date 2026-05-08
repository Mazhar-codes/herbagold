import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const ContactMe = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Sending...',
      text: 'Please wait while we deliver your message.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    emailjs.sendForm('service_bkqeskg', 'template_q27r159', form.current, 'lfBV0ogI4aslzcoKx')
      .then((result) => {
          Swal.fire({
            title: 'Message Sent!',
            text: 'We have received your message and will get back to you soon.',
            icon: 'success',
            confirmButtonColor: '#D4AF37'
          });
          form.current.reset();
      }, (error) => {
          console.error('EmailJS Error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to send message. Please try again or use WhatsApp.',
            icon: 'error',
            confirmButtonColor: '#D4AF37'
          });
      });
  };

    return (
        <div id='contactme' className='py-20 px-4 bg-white dark:bg-[#0A0A0A]'>
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase">Get In Touch</span>
                    <h1 className="text-4xl lg:text-5xl font-bold mt-3">Contact <span className="text-[#D4AF37]">Us</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">Have a question or want to place a bulk order? Reach out to us anytime!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info Cards */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaWhatsapp className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold">WhatsApp</h3>
                                <a href="https://wa.me/923155757274" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">+92 315 5757274</a>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaEnvelope className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold">Email</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">supportherbagold072@gmail.com</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaPhone className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold">Phone</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">+92 315 5757274</p>
                            </div>
                        </div>

                        <a 
                            href="https://wa.me/923155757274" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-3"
                        >
                            <FaWhatsapp className="text-2xl" /> Chat with us now
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
                            <input 
                                type="email" 
                                placeholder="Your Email" 
                                name="from_email"  
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors" 
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                name="from_name" 
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors" 
                                required 
                            />
                            <textarea 
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 min-h-[150px] focus:outline-none focus:border-[#D4AF37] transition-colors" 
                                placeholder="Your Message" 
                                name="message"
                            ></textarea>
                            <button className="w-full py-4 bg-[#D4AF37] text-white font-bold text-lg rounded-xl hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMe;