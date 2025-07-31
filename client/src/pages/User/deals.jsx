import HotDealsScroll from "../../components/user/hot-deals";
import Hero from "../../components/user/hero";
import Header from "../../layouts/User/header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/cart-slice";

const Deals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
      dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } 
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ overflowX: "hidden" }}>
        <Header />
        <Hero />
        <HotDealsScroll />
    </div>
  );
}

export default Deals;