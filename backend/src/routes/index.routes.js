// index.js (main routes file)
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import recipeRoutes from "./recipe.routes.js";
import likeRoutes from "./like.routes.js";
import commentRoutes from "./comment.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/recipes", recipeRoutes);
router.use("/likes", likeRoutes);
router.use("/comments", commentRoutes);

export default router;
