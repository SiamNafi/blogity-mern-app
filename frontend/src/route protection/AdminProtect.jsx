import Loader from "@/components/Loader";
import { RouteSignIn } from "@/helper/RouteName";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProtect = () => {
  const user = useSelector((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // only finish checking when user state is ready
    if (user) {
      setIsChecking(false);
    }
  }, [user]);

  if (isChecking) {
    return <Loader />;
  }

  if (user?.isLoggedIn) {
    if (user.user.role === "admin") {
      return <Outlet />;
    } else {
      toast.error("Admin Only");
      return <Navigate to={RouteSignIn} replace />;
    }
  } else {
    // user not logged in → redirect
    return <Navigate to={RouteSignIn} replace />;
  }
};

export default AdminProtect;
