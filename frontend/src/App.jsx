import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  RouteAddBlog,
  RouteAddCategory,
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditBlog,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteSingleBlog,
  RouteUserDetails,
} from "./helper/RouteName.js";
import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import Blogdetails from "./pages/Blogs/Blogdetails";
import Addblog from "./pages/Blogs/Addblog";
import Editblog from "./pages/Blogs/Editblog";
import Singleblogdetails from "./pages/Blogs/Singleblogdetails";
import BlogByCategory from "./pages/Blogs/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import UserDetails from "./pages/UserDetails";
import AuthRouteProtect from "./route protection/AuthRouteProtect";
import AdminProtect from "./route protection/AdminProtect";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          {/* Blog routes */}
          <Route path={RouteSingleBlog()} element={<Singleblogdetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />
          {/* protected route */}
          <Route element={<AuthRouteProtect />}>
            <Route path={RouteBlog} element={<Blogdetails />} />
            <Route path={RouteAddBlog} element={<Addblog />} />
            <Route path={RouteEditBlog()} element={<Editblog />} />
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
          </Route>
          <Route element={<AdminProtect />}>
            <Route path={RouteBlog} element={<Blogdetails />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
            <Route path={RouteUserDetails} element={<UserDetails />} />
            {/* category routes */}
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
          </Route>
        </Route>
        <Route />
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
