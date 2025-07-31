import ProductCategoryDisp from "../../components/common/product-category-disp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/cart-slice";

const Explore = () => {
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
        <ProductCategoryDisp />
    );
}

export default Explore;