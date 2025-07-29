import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useCheckAuth(isAuthenticated) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'seller') {
        navigate('/seller/product/new');
      } else {
        navigate('/shop/explore');
      }
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
}