import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import RecipeCard from '../components/RecipeCard';

const Profile = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('videos');

  const [user, setUser] = useState({
    name: 'Mohhhhh',
    username: username || 'nvvv',
    avatar: 'https://via.placeholder.com/150?text=AS',
    joinDate: 'April 2024',
    followers: 1,
    following: 21,
    bio: 'Simple and crazy \n Wish me on 8th April ❤️',
  });

  const [userContent, setUserContent] = useState({
    videos: [
      {
        id: '1',
        title: 'Authentic Thai Green Curry Recipe',
        thumbnail: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=300&q=80',
        duration: '15:30',
        channel: 'CookPal',
        channelAvatar: 'https://via.placeholder.com/40',
        description: 'Learn to make authentic Thai curry from scratch',
        category: 'Cooking'
      },
      {
        id: '2',
        title: 'Homemade Pasta Carbonara',
        thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
        duration: '12:45',
        channel: 'CookPal',
        channelAvatar: 'https://via.placeholder.com/40',
        description: 'Classic Italian pasta dish tutorial',
        category: 'Cooking'
      },
    ],
    recipes: [
      {
        id: '1',
        title: 'Classic Chocolate Cake',
        thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80',
        prepTime: 20,
        cookTime: 35,
        difficulty: 'Moderate',
        category: 'Dessert',
        description: 'A rich and moist chocolate cake perfect for any occasion.',
        author: 'Mohhhhh',
        authorAvatar: 'https://via.placeholder.com/40',
        tags: ['Chocolate', 'Baking', 'Dessert']
      },
      {
        id: '2',
        title: 'Quick Vegan Stir-Fry',
        thumbnail: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=300&q=80',
        prepTime: 10,
        cookTime: 10,
        difficulty: 'Easy',
        category: 'Main Course',
        description: 'A fast and delicious vegan stir-fry ready in 20 minutes.',
        author: 'Mohhhhh',
        authorAvatar: 'https://via.placeholder.com/40',
        tags: ['Vegan', 'Quick', 'Healthy']
      },
    ],
  });

  const [showConfirm, setShowConfirm] = useState(null);

  useEffect(() => {
    // Simulated API call
    // fetchUserData();
  }, [username]);

  const handleDelete = (type, id) => {
    setShowConfirm({ type, id });
  };

  const confirmDelete = (type, id) => {
    setUserContent(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    setShowConfirm(null);
  };

  const cancelDelete = () => setShowConfirm(null);

  return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-orange-500 rounded-xl p-4 text-white mb-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-orange-100">@{user.username}</p>
                  <p className="text-sm text-orange-200">Joined {user.joinDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-white text-orange-600 px-4 py-2 rounded-full hover:bg-orange-50 transition-colors">
                  Edit Profile
                </button>
                <span className="text-orange-100">
                {user.followers} Foodies | {user.following} World
              </span>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line text-orange-100">{user.bio}</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex justify-center gap-4 border-b border-gray-200 pb-4">
              <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'videos'
                          ? 'bg-orange-100 text-orange-500'
                          : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Videos ({userContent.videos.length})
              </button>
              <button
                  onClick={() => setActiveTab('recipes')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'recipes'
                          ? 'bg-orange-100 text-orange-500'
                          : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Recipes ({userContent.recipes.length})
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'videos' ? (
                userContent.videos.length > 0 ? (
                    userContent.videos.map(video => (
                        <div key={video.id} className="relative">
                          <VideoCard video={video} />
                          <button
                              onClick={() => handleDelete('videos', video.id)}
                              className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
                          >
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      <p className="text-lg">No videos uploaded yet</p>
                    </div>
                )
            ) : (
                userContent.recipes.length > 0 ? (
                    userContent.recipes.map(recipe => (
                        <div key={recipe.id} className="relative">
                          <RecipeCard recipe={recipe} />
                          <button
                              onClick={() => handleDelete('recipes', recipe.id)}
                              className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
                          >
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      <p className="text-lg">No recipes shared yet</p>
                    </div>
                )
            )}
          </div>

          {/* Delete Confirmation Modal */}
          {showConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                  <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this {showConfirm.type.slice(0, -1)}?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                        onClick={cancelDelete}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                        onClick={() => confirmDelete(showConfirm.type, showConfirm.id)}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Profile;