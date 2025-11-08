import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { IsLogin } = useContext(AuthContext);
  return IsLogin ? children : <Navigate to="/login" />;
};

const PublicRoutes = ({ children }) => {
  const { IsLogin } = useContext(AuthContext);
  return !IsLogin ? children : <Navigate to="/notes" />;
};

export { PrivateRoutes, PublicRoutes };
