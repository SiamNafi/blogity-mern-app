import { getRelatedBlogs } from "@/api/blog.api";
import React from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { RouteSingleBlog } from "@/helper/RouteName";
import { useQuery } from "@tanstack/react-query";

const RelatedBlogs = ({ category, currentBlog }) => {
  // ✅ useQuery handles data fetching, loading, errors, and caching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["relatedBlogs", category, currentBlog], // unique cache per category+blog
    queryFn: () => getRelatedBlogs(category, currentBlog),
    enabled: !!category && !!currentBlog, // only run if both props are present
  });

  const relatedBlog = data?.blogs;

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red-500 text-sm">
        Failed to load related blogs: {error.message}
      </div>
    );

  return (
    <div>
      {/* Title */}
      <h2 className="text-xl font-semibold mb-5 text-white border-b border-gray-700 pb-2">
        Related Blogs
      </h2>

      {/* Blog List */}
      <div className="space-y-4">
        {relatedBlog?.length > 0 ? (
          relatedBlog.map((blog) => (
            <Link key={blog._id} to={RouteSingleBlog(category, blog.slug)}>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/60 transition-colors cursor-pointer">
                <div className="flex-shrink-0 w-20 h-16 rounded-md overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-200 line-clamp-2 hover:text-indigo-400 transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-400 text-sm text-center py-6">
            No Related Blogs Found 😥
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlogs;
