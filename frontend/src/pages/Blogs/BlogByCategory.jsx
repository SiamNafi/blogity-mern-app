import { getBlogsByCategory } from "@/api/blog.api";
import Blogcard from "@/components/Blogcard";
import Loader from "@/components/Loader";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const BlogByCategory = () => {
  const { category } = useParams();

  // Fetch blogs by category using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogsByCategory", category],
    queryFn: () => getBlogsByCategory(category),
    enabled: !!category, // only run query if category exists
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="flex items-center justify-center text-red-500 text-xl font-bold">
        Error: {error.message || "Something went wrong"}
      </div>
    );

  const blogs = data?.blogs || [];

  return (
    <>
      {blogs.length === 0 && (
        <div className="flex items-center justify-center text-2xl font-bold my-10">
          No Blogs Found By This Category 😥
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <Blogcard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default BlogByCategory;
