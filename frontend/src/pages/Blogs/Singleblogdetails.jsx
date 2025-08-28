import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { Calendar } from "lucide-react";

import { getBlogDetails } from "@/api/blog.api";
import Loader from "@/components/Loader";
import Comments from "@/components/Comments";
import ReactionDetails from "@/components/ReactionDetails";
import RelatedBlogs from "@/components/RelatedBlogs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Singleblogdetails = () => {
  const { blog, category } = useParams();

  // Fetch blog using React Query
  const { data, isLoading } = useQuery({
    queryKey: ["singleBlog", blog],
    queryFn: () => getBlogDetails(blog),
  });

  if (isLoading) return <Loader />;

  const blogData = data?.blog;

  if (!blogData)
    return (
      <div className="text-center text-lg text-gray-400 mt-10">
        Blog not found 😥
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 max-w-7xl mx-auto">
      {/* Blog Content */}
      <div className="w-full lg:w-[70%] rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8 bg-gray-900/40">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-white">
          {blogData.title}
        </h1>

        {/* Author + Date + Category */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
              <AvatarImage src={blogData.author?.avatar} />
              <AvatarFallback>
                {blogData.author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{blogData.author?.name}</p>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(blogData.createdAt).toLocaleDateString()}
              </p>
              <Badge className="self-start sm:self-auto my-3">
                {blogData.category?.name}
              </Badge>
            </div>
          </div>
          <div>
            <ReactionDetails blogid={blogData._id} />
          </div>
        </div>

        {/* Featured Image */}
        {blogData.featuredImage && (
          <div className="my-6">
            <img
              src={blogData.featuredImage}
              alt="Blog Featured"
              className="rounded-xl w-full h-[200px] sm:h-[300px] lg:h-[400px] object-cover shadow-md"
            />
          </div>
        )}

        {/* Blog Content */}
        <div
          className="prose prose-base sm:prose-lg max-w-none leading-relaxed
             prose-headings:font-semibold prose-h2:mt-6 prose-h2:mb-3
             prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-500
             prose-img:rounded-lg"
        >
          <MDEditor.Markdown
            source={blogData.blogContent}
            style={{
              backgroundColor: "transparent",
              color: "#e5e7eb",
              padding: 0,
              fontSize: "1.05rem",
            }}
          />
        </div>

        {/* Comments */}
        <Comments author_id={blogData.author?._id} blogid={blogData._id} />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-[30%] border rounded-xl p-4 sm:p-5 bg-gray-900/30">
        <RelatedBlogs category={category} currentBlog={blog} />
      </div>
    </div>
  );
};

export default Singleblogdetails;
