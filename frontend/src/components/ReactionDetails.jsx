import React from "react";
import { Heart, MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments } from "@/api/comment.api";
import { getLikes, toggleLike } from "@/api/like.api";

const ReactionDetails = ({ blogid }) => {
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  /** -------------------------
   * Fetch Comments
   * ------------------------- */
  const { data: commentsData } = useQuery({
    queryKey: ["comments", blogid],
    queryFn: () => fetchComments(blogid),
    staleTime: 1000 * 60, // 1 min
  });

  const comments = commentsData?.comments || [];

  /** -------------------------
   * Fetch Likes
   * ------------------------- */
  const { data: likesData } = useQuery({
    queryKey: ["likes", blogid],
    queryFn: () => getLikes(blogid),
    staleTime: 1000 * 60, // 1 min
  });

  const likes = likesData?.likes || [];
  const isLiked = likes.some((l) => l.author === user?.user?._id);

  /** -------------------------
   * Toggle Like Mutation
   * ------------------------- */
  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleLike(blogid),
    onSuccess: (res) => {
      toast.success(res.message);
      // Refresh likes after toggling
      queryClient.invalidateQueries(["likes", blogid]);
    },
    onError: () => {
      toast.error("Failed to update like. Try again.");
    },
  });

  const handleLike = () => {
    toggleLikeMutation.mutate();
  };

  return (
    <div className="flex items-center gap-6 mt-4">
      {/* Likes */}
      <div
        className={`flex items-center gap-2 cursor-pointer transition ${
          isLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"
        }`}
        onClick={handleLike}
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-pink-500" : ""}`} />
        <span className="text-sm font-medium">{likes.length}</span>
      </div>

      {/* Comments */}
      <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition cursor-pointer">
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm font-medium">{comments.length}</span>
      </div>
    </div>
  );
};

export default ReactionDetails;
