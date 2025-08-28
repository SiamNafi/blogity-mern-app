import { RouteSignIn } from "@/helper/RouteName";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const AuthRouteProtect = () => {
  const user = useSelector((state) => state.user);
  if (user.user && user.isLoggedIn) {
    return <Outlet />;
  } else {
    toast.error("Please Login First");
    return <Navigate to={RouteSignIn} />;
  }
};

export default AuthRouteProtect;
