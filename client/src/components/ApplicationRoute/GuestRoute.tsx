import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return isAuthenticated || user ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
