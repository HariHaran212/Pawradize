import React from 'react';
import { Route } from 'react-router-dom';
import AdminProducts from "../admin/pages/AdminProducts";
import AddProduct from "../admin/pages/AddProduct";
import EditProduct from "../admin/pages/EditProduct";
import ViewProduct from "../admin/pages/ViewProduct";
import AdminOrders from '../admin/pages/AdminOrders';
import ViewOrders from '../admin/pages/ViewOrders';

const productRoutes =  (
    <>
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<ViewOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/view/:id" element={<ViewProduct />} />
    </>
);

export default productRoutes;