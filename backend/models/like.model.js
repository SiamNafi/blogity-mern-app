import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  blogid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Blog",
  },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
