import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from './GoogleLogin';
import logo from '../../assets/logo.png';

const Login = () => {
    const [user, setUser] = useState(null);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        signIn(email, password)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonColor: '#D4AF37'
                })
            })
    }
    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-[#0A0A0A]'>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src={logo} alt="HERBA GOLD" className="h-16 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Welcome <span className="text-[#D4AF37]">Back</span></h1>
                    <p className="text-gray-500 mt-2">Sign in to your HERBA GOLD account</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Email</label>
                            <input type="email" name='email' placeholder="you@example.com" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" required />
                        </div>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Password</label>
                            <input type="password" name='password' placeholder="••••••••" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" required />
                        </div>
                        <button className="w-full py-3 bg-[#D4AF37] text-white font-bold text-lg rounded-xl hover:bg-black transition-all transform hover:-translate-y-0.5 shadow-lg mt-2">Login</button>
                        <div className='flex items-center justify-center'><GoogleLogin></GoogleLogin></div>
                    </form>
                    <div className='text-center mt-6'>
                        <p className="text-gray-500">Don't have an account? <Link to="/register" className="text-[#D4AF37] font-bold hover:underline">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;