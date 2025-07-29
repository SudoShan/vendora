import HotDealsScroll from "../../components/user/hot-deals";
import Hero from "../../components/user/hero";
import Header from "../../layouts/User/header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../store/cart-slice";

const Deals = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div style={{ overflowX: "hidden" }}>
        <Header />
        <Hero />
        <HotDealsScroll />
    </div>
  );
}

export default Deals;