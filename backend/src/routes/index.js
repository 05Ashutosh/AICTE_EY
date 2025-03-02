import express from "express";
import userRouter from "./user.routes.js";
import recipeRouter from "./recipe.routes.js";
import commentRouter from "./comment.routes.js";
import likeRouter from "./like.routes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/recipes", recipeRouter);
router.use("/comments", commentRouter);
router.use("/likes", likeRouter);

export default router;
