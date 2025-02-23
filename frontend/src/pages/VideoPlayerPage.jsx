import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Share2, Bookmark, MessageCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';

const VideoPlayerPage = () => {
    const location = useLocation();
    const video = location.state?.video;

    const [comments, setComments] = useState([
        { id: 1, user: 'ChefLover23', avatar: 'https://via.placeholder.com/40?text=CL', text: 'This recipe is amazing! Tried it last night and it was a hit!', likes: 15, timestamp: '2 hours ago' },
        { id: 2, user: 'FoodieFan', avatar: 'https://via.placeholder.com/40?text=FF', text: 'Can you make a vegan version of this?', likes: 8, timestamp: '1 day ago' },
    ]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    if (!video) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-700">Video not found</h2>
            </div>
        );
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([
                ...comments,
                { id: comments.length + 1, user: 'CurrentUser', avatar: 'https://via.placeholder.com/40?text=CU', text: newComment, likes: 0, timestamp: 'Just now' }
            ]);
            setNewComment('');
        }
    };

    // Mind-relaxing colors for Pinterest-style ingredient cards
    const pastelColors = [
        'bg-green-100', // Mint green
        'bg-purple-100', // Lavender
        'bg-orange-100', // Light peach
        'bg-blue-100', // Soft blue
        'bg-pink-100', // Pale pink
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
                {/* Left Section: Video Player, Info, Ingredients, Comments */}
                <div className="lg:w-2/3">
                    {/* Video Player */}
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                        <video controls autoPlay className="w-full h-full object-cover" src={video.videoUrl} poster={video.thumbnail}>
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Video Info Card */}
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
                        <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={video.authorAvatar || 'https://via.placeholder.com/40?text=CH'}
                                    alt={video.author || 'Unknown Author'}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{video.author || 'Unknown Author'}</h3>
                                    <p className="text-sm text-gray-500">@{video.username || 'unknown'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center text-gray-500 hover text-rose-500">
                                    <Heart className="h-6 w-6 mr-1" />
                                    <span>{video.likes || 0}</span>
                                </button>
                                <button className="p-2 hover bg-gray-200 rounded-full">
                                    <Share2 className="h-6 w-6 text-gray-600 hover text-gray-800" />
                                </button>
                                <button className="p-2 hover bg-gray-200 rounded-full">
                                    <Bookmark className="h-6 w-6 text-gray-600 hover text-yellow-500" />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-2">{video.description}</p>
                    </div>

                    {/* Recipe Details Card */}
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipe Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-500">Prep Time</p>
                                <p className="text-lg font-medium text-gray-900">{video.prepTime} mins</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Cook Time</p>
                                <p className="text-lg font-medium text-gray-900">{video.cookTime} mins</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Difficulty</p>
                                <p className="text-lg font-medium text-gray-900">{video.difficulty}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="text-lg font-medium text-gray-900">{video.category}</p>
                        </div>
                    </div>

                    {/* Ingredients Card - Pinterest Style with Text Only */}
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {video.ingredients.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className={`${pastelColors[index % pastelColors.length]} p-4 rounded-lg shadow-sm hover shadow-md transition-shadow flex items-center justify-center`}
                                >
                                    <p className="text-gray-800 text-sm font-medium text-center">{ingredient}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comment Section - Toggles Below */}
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center justify-between w-full text-xl font-semibold text-gray-800 mb-4"
                        >
                            <div className="flex items-center">
                                <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
                                Comments ({video.comments || comments.length})
                            </div>
                            {showComments ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                        {showComments && (
                            <div>
                                <form onSubmit={handleCommentSubmit} className="mb-6">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="https://via.placeholder.com/40?text=CU"
                                            alt="User"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="Add a comment..."
                                                className="w-full p-3 pr-12 rounded-md bg-gray-100 border border-gray-200 focus outline-none focus ring-2 focus ring-blue-500 focus border-transparent text-gray-700"
                                            />
                                            <button
                                                type="submit"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-500 hover text-blue-700"
                                            >
                                                <Send className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="space-y-4 max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="flex space-x-3">
                                            <img
                                                src={comment.avatar}
                                                alt={comment.user}
                                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="text-sm font-semibold text-gray-800">{comment.user}</h4>
                                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <button className="flex items-center text-gray-500 hover text-rose-500">
                                                        <Heart className="h-4 w-4 mr-1" />
                                                        <span className="text-xs">{comment.likes}</span>
                                                    </button>
                                                    <button className="text-xs text-gray-500 hover text-blue-500">Reply</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section: Steps */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-4 rounded-xl shadow-sm sticky top-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Steps</h2>
                        <ol className="list-decimal list-inside space-y-2 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {video.steps.map((step, index) => (
                                <li key={index} className="text-gray-700">{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;