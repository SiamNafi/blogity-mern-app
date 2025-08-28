import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Searchbox from "./Searchbox";
import {
  RouteAddBlog,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helper/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/user.png";
import { logoutUser } from "@/api/user.api";
import { toast } from "react-toastify";
import { removeUser } from "@/redux/user/user.slice";
import { useSidebar } from "./ui/sidebar";
const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const data = await logoutUser();
    dispatch(removeUser());
    toast.success(data.message);
    navigate(RouteIndex);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="flex justify-between items-center fixed w-full z-20 h-16 bg-[#18181b] p-5 lg:px-10 border-b">
      <div className="flex justify-center items-center gap-2 ">
        <button onClick={toggleSidebar} type="button" className="md:hidden">
          <MenuIcon size={25} />
        </button>
        <Link to={RouteIndex}>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
            Blogity
          </h1>
        </Link>
      </div>
      <div className="w-[500px]">
        <div
          className={`${
            showSearch ? "block" : "hidden"
          } md:block md:relative absolute md:top-0 left-0 w-full top-16 p-5 md:p-0 rounded-full`}
        >
          <Searchbox />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block"
        >
          <SearchIcon size={25} />
        </button>

        {!user.isLoggedIn ? (
          <Button asChild>
            <Link to={RouteSignIn}>
              <LogIn />
              Sign in
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className={"cursor-pointer"}>
                <AvatarImage src={user.user.avatar || userIcon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p className="text-lg">{user.user.name}</p>
                <p className="text-sm">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={"cursor-pointer"} asChild>
                <Link to={RouteProfile}>
                  <UserIcon />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className={"cursor-pointer"} asChild>
                <Link to={RouteAddBlog}>
                  <PlusIcon />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Button
                onClick={handleLogout}
                className={"w-full"}
                variant={"destructive"}
              >
                <LogOutIcon color="white" />
                Log out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
