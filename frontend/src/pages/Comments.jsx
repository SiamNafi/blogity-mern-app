import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteComment, getAllComments } from "@/api/comment.api";
import Loader from "@/components/Loader";
import { TrashIcon } from "lucide-react";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Comments = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch comments with useQuery
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: getAllComments,
    select: (res) => res, // if API returns {success, message, data} adjust here
  });

  // ✅ Mutation for delete
  const mutation = useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: (data) => {
      toast.success(data.message || "Comment deleted");
      queryClient.invalidateQueries(["comments"]); // refetch comments
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="text-xl">
                <TableHead>Blog</TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments && comments?.length > 0 ? (
                comments.map((comment) => (
                  <TableRow key={comment?._id}>
                    <TableCell>{comment?.blogid?.title}</TableCell>
                    <TableCell>{comment?.author?.name}</TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell>
                      {new Date(comment?.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex gap-2 items-center">
                      {/* Delete with confirmation dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={mutation.isLoading}
                          >
                            <TrashIcon className="mr-1 h-4 w-4" />
                            {mutation.isLoading ? "Removing..." : "Remove"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the comment{" "}
                              <b className="text-xl text-white">
                                {comment?.comment}
                              </b>
                              .
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => mutation.mutate(comment?._id)}
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
                    😥 No comments found
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

export default Comments;
