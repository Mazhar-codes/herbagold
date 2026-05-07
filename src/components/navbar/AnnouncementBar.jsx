import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';

const AnnouncementBar = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/settings`)
            .then(res => res.json())
            .then(data => {
                if (data.texts) {
                    setMessages(data.texts);
                } else {
                    setMessages([
                        "delivery within 5 to 6 days",
                        "free shipping on orders above 2000 pkr",
                        "New HERBA GOLD arrivals available now!"
                    ]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Settings fetch error:', err);
                setMessages([
                    "delivery within 5 to 6 days",
                    "free shipping on orders above 2000 pkr"
                ]);
                setLoading(false);
            });
    }, []);

    if (loading || messages.length === 0) return null;

    return (
        <div className="bg-[#D4AF37] text-black overflow-hidden py-2 font-bold text-sm tracking-wide">
            <div className="animate-marquee whitespace-nowrap inline-block">
                {messages.map((text, i) => (
                    <span key={i} className="mx-10 uppercase">
                        ✨ {text}
                    </span>
                ))}
                {/* Duplicate for seamless loop */}
                {messages.map((text, i) => (
                    <span key={`dup-${i}`} className="mx-10 uppercase">
                        ✨ {text}
                    </span>
                ))}
            </div>
            
            <style jsx>{`
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export default AnnouncementBar;
