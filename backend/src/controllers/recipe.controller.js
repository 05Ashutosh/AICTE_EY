import { Recipe } from "../models/recipes.model";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { uploadOnCloudinary, cloudinaryDelete } from "../utils/cloudinary.js";

const getAllRecipes = asyncHandler(async (req, res) => {
  const { page = 1, limit = 100, query, sortBy, sortType, userId } = req.query;

  const conditions = {};
  if (query) {
    conditions.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }
  if (userId) {
    conditions.owner = userId;
  }

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortType === "desc" ? -1 : 1;
  }

  const recipes = await Recipe.find(conditions)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("owner", "username email")
    .lean();

  const totalRecipes = await Recipe.countDocuments(conditions);

  return res.status(200).json(
    new APIResponse(
      200,
      {
        recipes,
        totalRecipes,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecipes / limit),
      },
      "Recipes fetched successfully"
    )
  );
});

const publish = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (title.trim().length === 0 || description.trim.length == 0) {
    throw new APIError(400, "Title and description are required");
  }

  const mediaFileLocalPath = req.files?.mediaFile[0]?.path;
  if (!mediaFileLocalPath) {
    throw new APIError(400, "Media file is required");
  }
  const mediaFile = await UploadOnCloudinary(mediaFileLocalPath);

  if (!mediaFile) {
    throw new APIError(400, "Error uploading media file");
  }

  const recipe = await Recipe.create({
    mediaFile,
    title,
    description,
    type: req.body.type,
    owner: req.user._id,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    difficulty: req.body.difficulty,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    category: req.body.category,
  });
  const createdRecipe = await Recipe.findById(recipe._id);
  if (!createdRecipe) {
    await Promise.all([await cloudinaryDelete(mediaFile.url)]);
    throw new APIError(500, "Something went wrong while creating recipe");
  }

  return res
    .status(200)
    .json(new APIResponse(200, createdRecipe, "Recipe created successfully"));
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const { recipeId } = res.params;
  const { _id: userId } = req.body;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new APIError(404, `Recipe with ${recipeId} not found`);
  }

  if (recipe.owner.toString() !== userId.toString()) {
    throw new APIError(403, "You do not have permission to delete this recipe");
  }

  await cloudinaryDelete(recipe.mediaFile);

  await recipe.findByIdAndDelete(recipeId);

  await Like.deleteMany({ recipe: recipeId });

  return res
    .status(200)
    .json(new APIResponse(200, null, "Recipe deleted successfully"));
});
