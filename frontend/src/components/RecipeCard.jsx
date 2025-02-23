import React from 'react';
import { Clock, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();

    const getBgColor = (category) => {
        switch (category.toLowerCase()) {
            case 'lunch':
                return 'bg-green-50';
            case 'main course':
                return 'bg-orange-50';
            case 'sidedish':
            case 'soup':
                return 'bg-red-50';
            default:
                return 'bg-gray-50';
        }
    };

    const getButtonColor = (category) => {
        switch (category.toLowerCase()) {
            case 'lunch':
                return 'bg-green-600 hover:bg-green-700';
            case 'main course':
                return 'bg-orange-600 hover:bg-orange-700';
            case 'sidedish':
            case 'soup':
                return 'bg-red-600 hover:bg-red-700';
            default:
                return 'bg-gray-600 hover:bg-gray-700';
        }
    };

    return (
        <div className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${getBgColor(recipe.category)}`}>
            {/* Owner Section */}
            <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
                <div className="relative h-10 w-10 flex-shrink-0">
                    <img
                        src={recipe.authorAvatar}
                        alt={recipe.author}
                        className="rounded-full object-cover w-full h-full"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{recipe.author}</h4>
                    <p className="text-xs text-gray-500 font-medium">Recipe Creator</p>
                </div>
            </div>

            {/* Image Section */}
            <div className="relative aspect-video px-4 pt-4">
                <div className="relative h-full w-full rounded-t-xl overflow-hidden">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm">
                        <Heart className="h-5 w-5 text-rose-400 hover:text-rose-600" />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
                        <Clock className="h-4 w-4 mr-1.5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    {/* Category & Difficulty */}
                    <div className="flex gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getButtonColor(recipe.category)} text-white`}>
                            {recipe.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-600 text-white">
                            {recipe.difficulty}
                        </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {recipe.description}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {recipe.tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-white text-gray-600 border border-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* View Recipe Button */}
                <button onClick={() => navigate(`/recipe/${recipe.id}`)} className={`w-fit py-2 px-4 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${getButtonColor(recipe.category)}`}>
                    View Recipe
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;