import ProductCategoryDisp from "../../components/common/product-category-disp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../store/cart-slice";

const Explore = () => {
    const dispatch = useDispatch();
      useEffect(() => {
          dispatch(getCartItems());
    }, [dispatch]);

    return (
        <ProductCategoryDisp />
    );
}

export default Explore;