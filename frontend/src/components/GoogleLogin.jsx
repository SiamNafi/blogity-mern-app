import React from "react";
import { Button } from "./ui/button";
import { GlobeIcon } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helper/firebase";
import { googleLogin } from "@/api/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "@/helper/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const values = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };
    const data = await googleLogin(values);
    toast.success(data.message);
    navigate(RouteIndex);
    dispatch(setUser(data.user));
  };
  return (
    <Button onClick={handleLogin} className={"flex gap-2 w-full"}>
      <GlobeIcon />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
