import { Navigate } from "react-router-dom";

export default function RedirectToHome() {
  return <Navigate to="/" replace />;
}
