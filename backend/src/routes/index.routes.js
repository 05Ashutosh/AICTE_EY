// Filename: index.routes.js
import { Router } from "express";
import recipeRoutes from "./recipe.routes.js";
import likeRoutes from "./likes.routes.js";
import commentRoutes from "./comment.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

// Log when a request hits the main router
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);
    next();
});

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);
router.use("/likes", likeRoutes);
router.use("/comments", commentRoutes);

// Log if no route matches (fallback)
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] No route matched for: ${req.method} ${req.url}`);
    next();
});

export default router;