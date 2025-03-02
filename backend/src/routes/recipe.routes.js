// recipe.routes.js
import { Router } from "express";
import {
  getAllRecipes,
  publish,
  deleteRecipe,
} from "../controllers/recipe.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getAllRecipes);
router
  .route("/publish")
  .post(
    verifyJWT,
    upload.fields([{ name: "mediaFile", maxCount: 1 }]),
    publish
  );
router.route("/:recipeId").delete(verifyJWT, deleteRecipe);

export default router;
