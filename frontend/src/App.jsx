

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RecipeDetails from "./pages/RecipeDetails.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Home from "./pages/Home.jsx";
import RecipeForm from "./pages/RecipeForm.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

const AppContent = () => {
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {!isAuthRoute && <Navbar toggleSidebar={toggleSidebar} />}
            <div className="flex flex-1">
                {!isAuthRoute && <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />}
                <div
                    className={`flex-1 transition-all duration-300 ${
                        !isAuthRoute ? (isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64') : ''
                    }`}
                >
                    <Routes>
                        <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                        <Route path="/profile/" element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>} />
                        <Route path="/recipe/:recipeId" element={<ProtectedRoutes><RecipeDetails /></ProtectedRoutes>} />
                        <Route path="/create-recipe" element={<ProtectedRoutes><RecipeForm /></ProtectedRoutes>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/videos" element={<ProtectedRoutes><VideoPage /></ProtectedRoutes>} />
                        <Route path="/video/:id" element={<ProtectedRoutes><VideoPlayerPage /></ProtectedRoutes>} />
                        <Route path="/favorites" element={<ProtectedRoutes><FavoritesPage /></ProtectedRoutes>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;