import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteSingleBlog } from "@/helper/RouteName";

const Blogcard = ({ blog }) => {
  return (
    <Link to={RouteSingleBlog(blog?.category?.slug, blog?.slug)}>
      <Card className="pt-5 flex flex-col h-[400px] hover:scale-105 transition-all duration-200">
        <CardContent className="flex flex-col h-full">
          {/* User info */}
          <div className="flex items-center justify-between">
            <div className="flex justify-between w-full items-center">
              <Avatar>
                <AvatarImage src={blog?.author?.avatar} />
                <AvatarFallback>
                  {blog?.author?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {blog?.author?.role === "user" && (
                <Badge>{blog?.author?.name}</Badge>
              )}

              {blog?.author?.role === "admin" && (
                <Badge variant="outline">Admin</Badge>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="my-2 h-50">
            <img
              src={blog?.featuredImage}
              alt=""
              className="rounded w-full h-full object-cover"
            />
          </div>

          {/* Blog details */}
          <div className="mt-auto">
            <p className="flex gap-3 my-2 items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
            </p>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold line-clamp-2">
                {blog?.title.length > 30
                  ? blog?.title.slice(0, 20) + "..."
                  : blog?.title}
              </h1>
              <Badge>{blog?.category?.name}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Blogcard;
