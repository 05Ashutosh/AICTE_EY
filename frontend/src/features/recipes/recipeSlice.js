import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/api";
import { toast } from "react-toastify";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest("/recipes");
      if (!response.ok) throw new Error("Failed to fetch recipes");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const publishRecipe = createAsyncThunk(
  "recipes/publish",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiRequest("/recipes/publish", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to publish recipe");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.recipes = payload.data.recipes;
      })
      .addCase(fetchRecipes.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(publishRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishRecipe.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Unshift new recipe so it appears at the beginning
        state.recipes.unshift(payload.data);
        toast.success("Recipe published successfully");
      })
      .addCase(publishRecipe.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        toast.error(error.message);
      });
  },
});

export default recipeSlice.reducer;
