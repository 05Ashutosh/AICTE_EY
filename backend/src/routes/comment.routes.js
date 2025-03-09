// comment.routes.js
import { Router } from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All routes need authentication
router.use(verifyJWT);

router.route("/:commentId").patch(updateComment).delete(deleteComment);
router.route("/recipe/:recipeId").get(getCommentsByPost);
router.route("/recipe/:recipeId/comments").post(createComment);

export default router;
