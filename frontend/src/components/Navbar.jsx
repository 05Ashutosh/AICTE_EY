import { useState, useEffect, useRef } from 'react';
import { Search, User, PlusSquare, Menu, X, Home, Utensils, Video, Heart, BookOpen, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchInput from './SearchInput';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Utensils, label: 'My Recipes', path: '/my-recipes' },
        { icon: Video, label: 'Videos', path: '/videos' },
        { icon: Heart, label: 'Favorites', path: '/favorites' },
        // { icon: BookOpen, label: 'Cookbook', path: '/cookbook' },
    ];

    const bottomNavItems = [
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: LogOut, label: 'Logout', path: '/logout' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            navigate('/logout');
            setIsMobileMenuOpen(false);
        }
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const updateNavbarHeight = () => {
            if (navbarRef.current) {
                setNavbarHeight(navbarRef.current.offsetHeight);
            }
        };

        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);

        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
        };
    }, []);

    return (
        <>
            <header ref={navbarRef} className="sticky z-50 top-0 bg-white shadow-sm">
                <div className="px-4 py-3 md:py-4">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        {/* Left Section: Logo and Menu Button */}
                        <div className="flex items-center gap-2">
                            <button
                                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={handleMobileMenuToggle}
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6 text-gray-600" />
                                ) : (
                                    <Menu className="h-6 w-6 text-gray-600" />
                                )}
                            </button>
                            <h1
                                className="text-xl md:text-2xl font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
                                onClick={() => navigate('/')}
                            >
                                CookPal
                            </h1>
                        </div>

                        {/* Center Section: Search (Hidden on Mobile) */}
                        <div className="hidden md:block flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <SearchInput />
                            </div>
                        </div>

                        {/* Right Section: Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/create-recipe')}
                                className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 rounded-full transition-colors font-medium bg-orange-100 text-orange-500 hover:bg-orange-200"
                            >
                                <PlusSquare className="h-5 w-5" />
                                <span className="hidden md:block">Create Recipe</span>
                            </button>
                            <button
                                onClick={() => navigate('/profile')}
                                className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <User className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden px-4 pb-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <SearchInput />
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        className="md:hidden absolute left-0 right-0 bg-white border-b border-gray-200"
                        style={{ top: `${navbarHeight}px` }}
                    >
                        <nav className="p-4 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-orange-500 ${
                                        isActive(item.path)
                                            ? ' bg-orange-100'
                                            : 'hover:bg-orange-200'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </button>
                            ))}

                            <div className="border-t my-2" />

                            {bottomNavItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={item.label === 'Logout' ? handleLogout : () => handleNavigation(item.path)}
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                                        isActive(item.path)
                                            ? 'bg-blue-50 text-blue-600 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;