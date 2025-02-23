import React from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
    const navigate = useNavigate();

    const getBgColor = (category) => {
        switch (category.toLowerCase()) {
            case 'music':
                return 'bg-blue-50';
            case 'gaming':
                return 'bg-purple-50';
            case 'education':
                return 'bg-green-50';
            default:
                return 'bg-gray-50';
        }
    };

    const handleCardClick = () => {
        navigate(`/video/${video.id}`, { state: { video } });
    };

    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 ${getBgColor(
                video.category
            )} group hover:bg-gray-100 cursor-pointer`}
            onClick={handleCardClick}
        >
            {/* Thumbnail Section */}
            <div className="relative aspect-[16/12] px-2 pt-2 pb-4">
                <div className="relative h-full w-full rounded-lg overflow-hidden">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Duration - Top Left, always visible */}
                    <div className="absolute top-3 left-3 flex items-center bg-white/90 group-hover:bg-white/70 px-3 py-1.5 rounded-full shadow-sm">
                        <Play className="h-4 w-4 mr-1.5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{video.duration}</span>
                    </div>

                    {/* Title and Description on Thumbnail */}
                    <div className="absolute -bottom-5 left-3 right-3 z-10">
                        <h3
                            className="text-lg font-semibold text-white transition-transform duration-700 group-hover:-translate-y-8"
                        >
                            {video.title}
                        </h3>
                        {/* Description - Shown just below title on hover */}
                        <p
                            className="text-sm text-white/90 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:-translate-y-8"
                        >
                            {video.description}
                        </p>
                    </div>

                    {/* Heart Button */}
                    <button
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
                        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking heart
                    >
                        <Heart className="h-5 w-5 text-rose-400 hover:text-rose-600" />
                    </button>
                </div>
            </div>

            {/* Channel Section (Always visible) */}
            <div className="p-4 flex items-center space-x-3 border-t border-gray-100">
                <div className="relative h-10 w-10 flex-shrink-0">
                    <img
                        src={video.channelAvatar}
                        alt={video.channel}
                        className="rounded-full object-cover w-full h-full"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{video.channel}</h4>
                    <p className="text-xs text-gray-500 font-medium">Channel</p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;