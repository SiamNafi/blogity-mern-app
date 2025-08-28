import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSelector } from "react-redux";
import { fetchComments, postComment } from "@/api/comment.api";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

dayjs.extend(relativeTime);

// Zod schema
const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(300, "Max 300 characters"),
});

const Comments = ({ author_id, blogid }) => {
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const [charCount, setCharCount] = useState(0);
  const [overLimit, setOverLimit] = useState(false);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  // ✅ Fetch comments with useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", blogid],
    queryFn: () => fetchComments(blogid),
  });

  const commentsList = data?.comments || [];

  // ✅ Post comment with useMutation
  const mutation = useMutation({
    mutationFn: (newComment) => postComment(newComment),
    onSuccess: (res) => {
      toast.success(res.message);
      form.reset();
      setCharCount(0);
      setOverLimit(false);
      queryClient.invalidateQueries(["comments", blogid]); // refresh comments
    },
    onError: (err) => {
      toast.error(err.message || "Failed to post comment");
    },
  });

  const onSubmit = (values) => {
    if (values.comment.length > 300) {
      setOverLimit(true);
      return;
    }
    mutation.mutate({ blogid, comment: values.comment });
  };

  if (isLoading) return <p className="text-gray-400">Loading comments...</p>;
  if (isError) return <p className="text-red-500">Failed to load comments.</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-10 bg-gray-900/70 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-800"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-4 sm:mb-6"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        <h2 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
          Comments ({commentsList.length})
        </h2>
      </motion.div>

      {/* Comment Input */}
      {user.user._id !== author_id && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-1 sm:gap-3 mb-6"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-sm sm:text-base">
                    Write a comment
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Share your thoughts..."
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        if (e.target.value.length <= 300) {
                          field.onChange(e);
                          setCharCount(e.target.value.length);
                          setOverLimit(false);
                        } else {
                          setOverLimit(true);
                        }
                      }}
                      className="bg-gray-800/60 text-white placeholder-gray-500 border border-gray-700
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                 rounded-xl transition-all duration-300 focus:scale-[1.02] shadow-md w-full"
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs sm:text-sm mt-1 text-gray-400">
                    <span>{charCount}/300</span>
                    {overLimit && (
                      <span className="text-red-400">
                        Character limit exceeded!
                      </span>
                    )}
                  </div>
                  <FormMessage className="text-red-400 text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={mutation.isLoading}
              className="self-end cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
                         px-4 sm:px-5 py-2 rounded-xl shadow-lg transition transform
                         hover:scale-110 active:scale-95 text-sm sm:text-base"
            >
              {mutation.isLoading ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        </Form>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {commentsList.length === 0 && (
          <p className="text-gray-400 text-xs sm:text-sm italic">
            No comments yet. Be the first to share your thoughts ✨
          </p>
        )}

        <AnimatePresence>
          {commentsList.map((c, index) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group flex items-start gap-2 sm:gap-3 bg-gray-800/70 p-3 sm:p-4
                         rounded-xl border border-gray-700 hover:border-blue-500/50
                         hover:bg-gray-800 transition duration-200"
            >
              {/* Avatar */}
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-blue-500/40 shadow-md shrink-0">
                {c.author.avatar ? (
                  <AvatarImage src={c.author.avatar} />
                ) : (
                  <AvatarFallback className="bg-blue-600 text-white text-sm sm:text-base">
                    {c.author.name[0]}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Comment Content */}
              <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-semibold text-white text-sm sm:text-base">
                    {c.author.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {dayjs(c.createdAt).fromNow()}
                  </span>
                </div>
                <p
                  className="text-gray-300 text-sm sm:text-base leading-relaxed
                              group-hover:text-gray-200 transition break-words"
                >
                  {c.comment}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Comments;
