import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isAuthenticationFinish = useSelector((state) => state.dogGrooming.loginData?.isAuthenticationFinish);
    const isAuthentication = useSelector((state) => state.dogGrooming.loginData?.isAuthentication);

    if (!isAuthenticationFinish) { return; }
    if (!isAuthentication) return <Navigate to="/login" replace />;

    return children;
}