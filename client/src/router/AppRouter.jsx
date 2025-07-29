import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UserLayout from '../layouts/User/layout';
import ProductPage from '../components/common/product-page';
import UnAuthPage from '../pages/UnAuthPage';
import Deals from '../pages/User/deals';
import Explore from '../pages/User/explore';
import CheckOut from '../pages/User/checkout';
import NewProduct from '../pages/Seller/new-product';
import SellerLayout from '../layouts/Seller/layout';

export default function AppRouter() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="/seller" element={<SellerLayout />}>
          <Route path="product/new" element={<NewProduct />} />
        </Route>

        <Route path="/shop" element={<UserLayout />}>
          <Route path="explore" element={<Explore />} />
          <Route path="orders" element={<div>Orders Page</div>} />
        </Route>

        <Route path="/shop/deals" element={<Deals />} />
        <Route path="/shop/checkout" element={<CheckOut />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="/un-auth" element={<UnAuthPage />} />
        <Route path="*" element={<UnAuthPage />} />
      </Routes>
    </>
  );
}
