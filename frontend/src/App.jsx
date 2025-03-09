import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import UserProfile from "./pages/UserProfile";
import RecipeForm from "./pages/RecipeForm";
import FavoritesPage from "./pages/FavoritesPage";
import VideoPage from "./pages/VideoPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import {
  setAuthenticated,
  setUser,
  logoutUser,
} from "./features/auth/authSlice";
import { apiRequest } from "./utils/api";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const ProtectedLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <Navbar />
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <Outlet />
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        dispatch(setAuthenticated(false));
        return;
      }

      try {
        const response = await apiRequest(
          "/users/current-user",
          "GET",
          null,
          dispatch
        );
        dispatch(setUser({ user: response.data.data.user, token }));
      } catch (error) {
        if (error.message.includes("Unauthorized")) {
          try {
            const refreshResponse = await apiRequest(
              "/users/refresh-token",
              "POST",
              null,
              dispatch
            );
            const newToken = refreshResponse.data.data.accessToken;
            localStorage.setItem("accessToken", newToken);
            const currentUserResponse = await apiRequest(
              "/users/current-user",
              "GET",
              null,
              dispatch
            );
            dispatch(
              setUser({
                user: currentUserResponse.data.data.user,
                token: newToken,
              })
            );
          } catch (refreshError) {
            dispatch(logoutUser());
          }
        } else {
          dispatch(logoutUser());
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="recipe/:id" element={<RecipeDetails />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="create-recipe" element={<RecipeForm />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="videos" element={<VideoPage />} />
          <Route path="video/:id" element={<VideoPlayerPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
