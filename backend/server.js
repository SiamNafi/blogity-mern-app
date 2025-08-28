import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./config/connectDb.js";
import { errorHandler } from "./utils/erroHandler.js";
import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/commentRoutes.js";
import likeRouter from "./routes/like.routes.js";
import userRouter from "./routes/user.routes.js";
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

//connect database
connect();

//routes
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Your server is running");
});

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
