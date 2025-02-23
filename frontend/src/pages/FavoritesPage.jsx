import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

const FavoritesPage = () => {
    const [activeTab, setActiveTab] = useState('videos');

    const favorites = [
        // Video Example
        {
            id: 1,
            type: 'video',
            title: 'Perfect Homemade Pizza',
            thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
            duration: '12:30',
            category: 'Food',
            channel: 'Cooking Master',
            channelAvatar: 'https://via.placeholder.com/40',
            description: 'Learn to make authentic Italian pizza at home',
            likes: 1500,
            videoUrl: '/pizza-video.mp4'
        },
        // Recipe Example
        {
            id: 2,
            type: 'recipe',
            title: 'Classic Carbonara',
            category: 'Main Course',
            difficulty: 'Intermediate',
            prepTime: 15,
            cookTime: 20,
            author: 'Chef Maria',
            authorAvatar: 'https://via.placeholder.com/40',
            image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488',
            description: 'Creamy Roman pasta dish with pancetta',
            tags: ['Italian', 'Pasta', 'Quick Meal']
        }
    ];

    const favoriteVideos = favorites.filter(item => item.type === 'video');
    const favoriteRecipes = favorites.filter(item => item.type === 'recipe');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center bg-orange-100 text-orange-500 px-6 py-2 rounded-full mb-4">
                        <Heart className="h-5 w-5 mr-2" />
                        <h1 className="text-2xl font-bold">Your Favorites</h1>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center gap-4 border-b border-gray-200 pb-4">
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeTab === 'videos'
                                    ? 'bg-orange-100 text-orange-500'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Videos ({favoriteVideos.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('recipes')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeTab === 'recipes'
                                    ? 'bg-orange-100 text-orange-500'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Recipes ({favoriteRecipes.length})
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeTab === 'videos' ? (
                        favoriteVideos.length > 0 ? (
                            favoriteVideos.map(video => (
                                <VideoCard
                                    key={`video-${video.id}`}
                                    video={video}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <p className="text-lg">No favorite videos found</p>
                                <p className="text-sm mt-2">Start adding favorites by clicking the ♡ icon!</p>
                            </div>
                        )
                    ) : (
                        favoriteRecipes.length > 0 ? (
                            favoriteRecipes.map(recipe => (
                                <RecipeCard
                                    key={`recipe-${recipe.id}`}
                                    recipe={recipe}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <p className="text-lg">No favorite recipes found</p>
                                <p className="text-sm mt-2">Save your favorite recipes using the ♡ button!</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;