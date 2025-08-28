import { getBlogBySearch } from "@/api/blog.api";
import Blogcard from "@/components/Blogcard";
import Loader from "@/components/Loader";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  // useQuery for fetching blogs by search
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["searchBlogs", q], // cache key based on query
    queryFn: () => getBlogBySearch(q),
    enabled: !!q, // only run if q exists
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ Error: {error.message}
      </div>
    );

  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-center">
          Search Result For: {q}
        </h2>
      </div>
      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <Blogcard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg mt-10">
          😔 No results matched your search
        </div>
      )}
    </>
  );
};

export default SearchResult;
