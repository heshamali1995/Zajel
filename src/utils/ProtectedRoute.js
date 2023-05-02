import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (sessionStorage.getItem("admin") !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
