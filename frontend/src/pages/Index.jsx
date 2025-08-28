import { getAllBlogs } from "@/api/blog.api";
import Blogcard from "@/components/Blogcard";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Index = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 ">
      {data &&
        data?.blogs?.length > 0 &&
        data.blogs.map((blog) => <Blogcard key={blog._id} blog={blog} />)}
    </div>
  );
};

export default Index;
