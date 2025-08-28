import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  BoxesIcon,
  Circle,
  HomeIcon,
  MessageSquareIcon,
  NewspaperIcon,
  PlusIcon,
  UserIcon,
} from "lucide-react";
import {
  RouteAddBlog,
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteProfile,
  RouteUserDetails,
} from "@/helper/RouteName";
import { getAllCategory } from "@/api/category.api";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const AppSidebar = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });
  const user = useSelector((state) => state.user);

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
  return (
    <Sidebar className={"pt-4"}>
      <SidebarHeader>
        <h1 className="text-xl sm:text-3xl font-extrabold text-primary">
          Blogity
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={
                  "w-full hover:bg-primary cursor-pointer transition-all"
                }
              >
                <HomeIcon />
                <Link className="w-full" to={RouteIndex}>
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* normal user routes */}
            {user && user.isLoggedIn && user.user.role === "user" && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <NewspaperIcon />
                    <Link className="w-full" to={RouteBlog}>
                      Blogs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <MessageSquareIcon />
                    <Link className="w-full" to={RouteCommentDetails}>
                      Comments
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <PlusIcon />
                    <Link className="w-full" to={RouteAddBlog}>
                      Create Blog
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <UserIcon />
                    <Link className="w-full" to={RouteProfile}>
                      Your Profile
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}

            {/* admin routes */}
            {user && user.isLoggedIn && user.user?.role === "admin" && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <UserIcon />
                    <Link className="w-full" to={RouteProfile}>
                      Admin Profile
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <BoxesIcon />
                    <Link className="w-full" to={RouteCategoryDetails}>
                      Categories
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <MessageSquareIcon />
                    <Link className="w-full" to={RouteCommentDetails}>
                      Comments
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <UserIcon />
                    <Link className="w-full" to={RouteUserDetails}>
                      User
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full hover:bg-primary cursor-pointer transition-all">
                    <NewspaperIcon />
                    <Link className="w-full" to={RouteBlog}>
                      Blogs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
        {/* categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categories &&
              categories?.category?.length > 0 &&
              categories.category.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton
                    className={
                      "w-full hover:bg-primary cursor-pointer transition-all"
                    }
                  >
                    <Circle />
                    <Link
                      to={RouteBlogByCategory(category.slug)}
                      className="w-full"
                    >
                      {category.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
