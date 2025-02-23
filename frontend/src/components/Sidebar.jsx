import React from 'react';
import { Home, Utensils, Video, Heart, BookOpen, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Utensils, label: 'My Recipes', path: '/profile/' },
        { icon: Video, label: 'Videos', path: '/videos' },
        { icon: Heart, label: 'Favorites', path: '/favorites' },
        // { icon: BookOpen, label: 'Cookbook', path: '/' },
    ];

    const bottomNavItems = [
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: LogOut, label: 'Logout', path: '/logout' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div
            className={`hidden md:flex flex-col justify-between h-screen bg-white border-r border-gray-200 py-6 px-4 fixed left-0 top-0 transition-all duration-300 ${
                isCollapsed ? 'w-20' : 'w-64'
            } md:top-[65px]`} // Adjust top-65px based on Navbar height
        >
            <div>
                {/* Header with Animated Toggle Button */}
                <div className="flex items-center justify-end px-4 mb-8">
                    <button
                        onClick={toggleSidebar} // Use the prop passed from AppContent
                        className="p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                            <span
                                className={`absolute block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                                    isCollapsed ? 'rotate-45 translate-y-0' : '-translate-y-2'
                                }`}
                            />
                            <span
                                className={`absolute block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                                    isCollapsed ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            <span
                                className={`absolute block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                                    isCollapsed ? '-rotate-45 translate-y-0' : 'translate-y-2'
                                }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Main Navigation */}
                <nav>
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 transition-colors ${
                                isActive(item.path)
                                    ? 'bg-orange-100 text-orange-500'
                                    : 'text-gray-600 hover:bg-orange-200'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <item.icon
                                className={`h-5 w-5 flex-shrink-0 ${
                                    isActive(item.path) ? 'text-orange-500' : 'text-gray-400'
                                }`}
                            />
                            {!isCollapsed && <span className="font-medium">{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Bottom Navigation */}
            <nav>
                {bottomNavItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 transition-colors ${
                            isActive(item.path)
                                ? 'bg-orange-100 text-orange-500'
                                : 'text-gray-600 hover:bg-gray-50'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? item.label : ''}
                    >
                        <item.icon
                            className={`h-5 w-5 flex-shrink-0 ${
                                isActive(item.path) ? 'text-orange-500' : 'text-gray-400'
                            }`}
                        />
                        {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;