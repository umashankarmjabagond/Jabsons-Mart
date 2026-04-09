import { Navigate, Outlet, useLocation } from "react-router-dom";

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export default function ProtectedRoute() {
  const location = useLocation();

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const token = parsedUser?.token;

  const isAuthenticated = token && !isTokenExpired(token);

  if (!isAuthenticated) {
    localStorage.removeItem("user");
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
