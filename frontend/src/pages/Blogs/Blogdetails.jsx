import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteAddBlog, RouteEditBlog } from "@/helper/RouteName";
import Loader from "@/components/Loader";
import { EditIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { getUserBlogs, deleteBlog } from "@/api/blog.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Blogdetails = () => {
  const queryClient = useQueryClient();

  // Fetch user blogs
  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: getUserBlogs,
  });

  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (data, variables) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["userBlogs"] }); // Refetch blogs
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete blog");
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message || "Something went wrong"}
      </div>
    );

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddBlog}>Add Blog </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData?.blogs?.length > 0 ? (
                blogData.blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog.author?.name}</TableCell>
                    <TableCell>{blog.category?.name}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>
                      {new Date(blog.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex gap-2 items-center">
                      <Button asChild>
                        <Link to={RouteEditBlog(blog._id)}>
                          <EditIcon />
                          Edit
                        </Link>
                      </Button>

                      {/* Delete with confirmation dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <TrashIcon />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the blog{" "}
                              <b className="text-xl text-white">{blog.title}</b>
                              .
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(blog._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Data Not Found 😥
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blogdetails;
