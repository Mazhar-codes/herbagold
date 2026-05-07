import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-[#0A0A0A]'>
            <div className="text-center">
                <h1 className="text-9xl font-bold text-[#D4AF37]">404</h1>
                <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
                <p className="text-gray-500 mt-3 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                    <Link to="/" className="px-8 py-3 bg-[#D4AF37] text-white font-bold rounded-xl hover:bg-black transition-all">
                        Go Home
                    </Link>
                    <a href="https://wa.me/923155757274" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all">
                        💬 Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;