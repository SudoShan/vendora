import { Routes, Route } from 'react-router-dom';
import {Toaster} from 'sonner';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SellerLayout from '../layouts/Seller/layout';
import UserLayout from '../layouts/User/layout';
import CheckAuth from '../components/common/check-auth';
import ProductPage from '../components/common/product-page';
import UnAuthPage from '../pages/UnAuthPage';
import Deals from '../pages/User/deals';
import Explore from '../pages/User/explore';
import CheckOut from '../pages/User/checkout';
import NewProduct from '../pages/Seller/new-product';

export default function AppRouter() {
  const isAuthenticated = true; 
  const user = { role: 'user' }; 
  return (
    <>
      <Toaster position="top-right" />
        <Routes>
            <Route path="/login" element={<CheckAuth isAuthenticated={isAuthenticated} user = {user}><Login /></CheckAuth>} />
            <Route path="/register" element={<CheckAuth isAuthenticated={isAuthenticated} user = {user}><SignUp /></CheckAuth>} />


          <Route path="/seller" element={<CheckAuth isAuthenticated={isAuthenticated} user = {user}><SellerLayout /></CheckAuth>}>
            <Route path="product/new" element={<NewProduct />}/>
          </Route>

          <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user = {user}><UserLayout /></CheckAuth>}>
            <Route path="explore" element={<Explore />} />
            <Route path="orders" element={<div>Orders Page</div>} />
          </Route>
          <Route path="/shop/deals" element={<Deals />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="/un-auth" element={<UnAuthPage />} />
          <Route path="/checkout" element={<CheckAuth isAuthenticated={isAuthenticated} user = {user}><CheckOut /></CheckAuth>} />
          <Route path="*" element={<UnAuthPage />} />

        </Routes>
    </>
  );
}
