import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import recipes from "../data/recipes.js";
import CategoryNav from "../components/CategoryNav.jsx";

const HomePage = () => {
  const trendingRef = useRef(null);
  const recommendedRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50">
    //     <Sidebar />
    //     <div className="flex-1 md:ml-64">
    <main className="container mx-auto px-4 py-8">
      <CategoryNav />
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recommended Recipes</h2>
          <div className="gap-2 hidden md:block">
            <button
              onClick={() => scroll(recommendedRef, "left")}
              className="bg-orange-100 rounded-xl  px-5 py-2 hover:orange-500 group mr-2"
            >
              <ArrowLeft className="h-5 w-5 text-orange-300 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => scroll(recommendedRef, "right")}
              className="bg-orange-100 rounded-xl  px-5 py-2 hover:orange-500 group "
            >
              <ArrowRight className="h-5 w-5 text-orange-300 group-hover:text-orange-500" />
            </button>
          </div>
        </div>
        <div
          ref={recommendedRef}
          className="flex flex-col md:flex-row overflow-x-auto pb-4 gap-6 no-scrollbar"
          style={{
            msOverflowStyle: "none" /* IE and Edge */,
            scrollbarWidth: "none" /* Firefox */,
          }}
        >
          {recipes.map((recipe) => (
            <div key={recipe.id} className="min-w-[300px]">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </section>

      {/* Trending Recipes */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <div className="gap-4 hidden md:block">
            <button
              onClick={() => scroll(trendingRef, "left")}
              className="bg-orange-100 rounded-xl  px-5 py-2 hover:orange-500 group mr-2"
            >
              <ArrowLeft className="text-orange-300 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => scroll(trendingRef, "right")}
              className="bg-orange-100 rounded-xl  px-5 py-2 hover:orange-500 group"
            >
              <ArrowRight className="text-orange-300 group-hover:text-orange-500" />
            </button>
          </div>
        </div>
        <div
          ref={trendingRef}
          className="flex flex-col md:flex-row overflow-x-auto pb-4 gap-6 no-scrollbar"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {recipes.map((recipe) => (
            <div key={recipe.id} className="min-w-[300px]">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </section>
    </main>
    // </div>
    // </div>
  );
};

export default HomePage;

// Home.jsx
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import RecipeCard from "../components/RecipeCard";
// import { getRecipes } from "../features/recipes/recipeSlice";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { recipes, loading, error } = useSelector((state) => state.recipes);

//   useEffect(() => {
//     dispatch(getRecipes({ page: 1, limit: 10 }));
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6">Explore Recipes</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {recipes.map((recipe) => (
//           <RecipeCard
//             key={recipe._id}
//             recipe={{
//               id: recipe._id,
//               title: recipe.title,
//               description: recipe.description,
//               category: recipe.category,
//               difficulty: recipe.difficulty,
//               prepTime: recipe.prepTime,
//               cookTime: recipe.cookTime,
//               author: recipe.owner.username,
//               authorAvatar:
//                 recipe.owner.avatar || "https://via.placeholder.com/40",
//               image: recipe.mediaFile,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
