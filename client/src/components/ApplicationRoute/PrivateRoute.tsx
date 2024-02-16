import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return isAuthenticated || user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
