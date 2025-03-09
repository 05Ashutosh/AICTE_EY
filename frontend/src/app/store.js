import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Default export from authSlice
import recipeReducer from "../features/recipes/recipeSlice"; // Default export from recipeSlice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
  },
});
