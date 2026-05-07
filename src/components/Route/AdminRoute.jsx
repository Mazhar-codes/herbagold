
import React, {  useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { ADMIN_EMAIL } from '../../config';

const AdminRoute = ({ children }) => {
    const {user,loading} =useContext(AuthContext);
    const location = useLocation();
    

    if (loading) {
        return <progress className="progress w-56"></progress>;
    }

    // Check if the user is logged in and their email is the configured admin email
    if (user && user.email === ADMIN_EMAIL) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;