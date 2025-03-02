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

router.route("/").post(createComment);
router.route("/post/:postId").get(getCommentsByPost);
router.route("/:commentId").patch(updateComment).delete(deleteComment);

export default router;
