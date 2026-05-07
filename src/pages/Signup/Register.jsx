import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from '../login/GoogleLogin';
import logo from '../../assets/logo.png';

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const { createUser, updateUser, setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photourl = form.get('photourl');
        const email = form.get('email');
        const password = form.get('password');

        setRegisterError('')

        if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/.test(password)) {
            setRegisterError('Password must be at least 6 characters with 1 uppercase and 1 special character.');
            return;
        }

        createUser(email, password)
            .then(result => {
                updateUser(name, photourl)
                    .then(() => {
                        setUser((prev) => {
                            const updatedUser = { ...prev, displayName: name, photoURL: photourl }
                            return updatedUser;
                        })
                        navigate(location?.state ? location.state : '/');
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            })
            .catch(error => {
                console.error(error)
                setRegisterError(error.message);
            })
    }

    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-[#0A0A0A]'>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src={logo} alt="HERBA GOLD" className="h-16 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Create <span className="text-[#D4AF37]">Account</span></h1>
                    <p className="text-gray-500 mt-2">Join the HERBA GOLD community</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                    <form onSubmit={handleRegister} className="flex flex-col gap-5">
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Full Name</label>
                            <input type="text" name='name' placeholder="John Doe" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" required />
                        </div>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Photo URL</label>
                            <input type="text" name='photourl' placeholder="https://example.com/photo.jpg" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" required />
                        </div>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Email</label>
                            <input type="email" name='email' placeholder="you@example.com" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" required />
                        </div>
                        <div className="form-control">
                            <label className="text-sm font-bold mb-1 text-gray-500">Password</label>
                            <input type="password" name='password' placeholder="••••••••" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" required />
                            {registerError && <p className='text-red-500 text-sm mt-2'>{registerError}</p>}
                        </div>
                        <button className="w-full py-3 bg-[#D4AF37] text-white font-bold text-lg rounded-xl hover:bg-black transition-all transform hover:-translate-y-0.5 shadow-lg mt-2">Register</button>
                        <div className='flex items-center justify-center'><GoogleLogin></GoogleLogin></div>
                    </form>
                    <div className='text-center mt-6'>
                        <p className="text-gray-500">Already have an account? <Link to="/login" className="text-[#D4AF37] font-bold hover:underline">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;