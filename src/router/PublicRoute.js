import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isLogged }) => {
  return isLogged ? <Navigate to="/" /> : children;
};

export default PublicRoute;