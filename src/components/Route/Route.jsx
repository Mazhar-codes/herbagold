import React from 'react';
import Home from '../../pages/home/Home';
import { createBrowserRouter } from "react-router-dom";
import Mainlayout from '../../layout/Mainlayout';
import AddProduct from '../../pages/addProduct/AddProduct';
import BrandlProducts from '../../pages/brandProductPages/BrandlProducts';
import Login from '../../pages/login/Login';
import Register from '../../pages/Signup/Register';
import Update from '../update/Update';
import ViewDetail from '../../firebase/ViewDetail';
import ErrorPage from '../../pages/ErrorPage';
import PrivateRoute from './PrivateRoute';
import MyCart from '../../pages/cart/MyCart';
import ContactMe from '../../pages/contact/Contact';
import ManageProduct from '../../pages/manageProduct/ManageProduct';
import AdminRoute from './AdminRoute';
import { API_BASE_URL } from '../../config';


import AdminSettings from '../../pages/admin/AdminSettings';
import TrackOrder from '../../pages/trackOrder/TrackOrder';
import AdminOrders from '../../pages/manageProduct/AdminOrders';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
          path: "/",
          element: <Home></Home>,
          loader :()=> fetch('/brands.json'),
         
        },
        {
          path: "/track-order",
          element: <TrackOrder></TrackOrder>,
        },
        {
          path: "/admin/orders",
          element: <AdminRoute><AdminOrders></AdminOrders></AdminRoute>,
        },
        {
          path: "/addproduct",
          element: <AdminRoute><AddProduct></AddProduct></AdminRoute>,
         
        },
        {
          path: "/adminsettings",
          element: <AdminRoute><AdminSettings></AdminSettings></AdminRoute>,
         
        },
        {
          path: "/manageproduct",
          element: <AdminRoute><ManageProduct></ManageProduct></AdminRoute>,
          loader :()=> fetch(`${API_BASE_URL}/products`),
         
        },
        {
          path: "/contactus",
          element: <ContactMe></ContactMe>,
         
        },
   
        {
          
          path: "/brand/:brandName",
          element: <BrandlProducts></BrandlProducts>,
          loader: ({params})=>fetch(`${API_BASE_URL}/brand/${params.brandName}`),
        },
        
        {
         
          path: "/brand/update/:id",
          element:<PrivateRoute><Update></Update></PrivateRoute> ,
          loader: ({params})=>fetch(`${API_BASE_URL}/viewDetail/${params.id}`),
        },
        {
         
          path: "/viewDetail/:id",
          element: <ViewDetail></ViewDetail>,
          loader: ({params})=>fetch(`${API_BASE_URL}/viewDetail/${params.id}`),
        },

       
        {
          path: "/myCart",
          element:<PrivateRoute><MyCart></MyCart></PrivateRoute>,
          
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
      
  
      ]
    },
  ]);

export default router;