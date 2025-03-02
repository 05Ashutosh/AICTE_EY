// index.js (main routes file)
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import recipeRoutes from "./recipe.routes.js";
import likeRoutes from "./like.routes.js";
import commentRoutes from "./comment.routes.js";

const router = Router();

router.use("/auth", authRoutes); // Handles authentication routes
router.use("/recipes", recipeRoutes); // Handles recipe-related routes
router.use("/likes", likeRoutes); // Handles like-related routes
router.use("/comments", commentRoutes); // Handles comment-related routes

export default router;
