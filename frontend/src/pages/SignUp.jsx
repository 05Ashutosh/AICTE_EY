import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');  // Add error state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!fullName || !email || !username || !password) {
            setError('Please fill in all required fields.');
            return;
        }

        // Simulate signup (replace with your actual API call)
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        if (avatar) formData.append('avatar', avatar);
        if (coverImage) formData.append('coverImage', coverImage);

        try {
            const response = await fetch('/api/register', {  // Replace '/api/register'
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('User registered successfully');
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed. Please try again.');
            }

        } catch (error) {
            console.error('Error registering user:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleCoverImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImage(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-[250] to-yellow-300 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:px-10 md:py-7">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Account</h1>
                <p className="text-gray-600 mb-4 text-center">Sign up to get started</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* UserProfile Picture */}
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <div className="relative mt-1">
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="sr-only" // Hide the default file input
                            />
                            <label
                                htmlFor="avatar"
                                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center">
                                    <Image className="h-5 w-5 text-gray-400 mr-2" />
                                    <span>{avatar ? avatar.name : "Choose File"}</span>
                                </div>
                                <span className="text-gray-500">{avatar ? "" : "No file chosen"}</span>
                            </label>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image (Optional)</label>
                        <div className="relative mt-1">
                            <input
                                type="file"
                                id="coverImage"
                                accept="image/*"
                                onChange={handleCoverImageChange}
                                className="sr-only"  // Hide the default file input
                            />
                            <label
                                htmlFor="coverImage"
                                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center">
                                    <Image className="h-5 w-5 text-gray-400 mr-2" />
                                    <span>{coverImage ? coverImage.name : "Choose File"}</span>
                                </div>
                                <span className="text-gray-500">{coverImage ? "" : "No file chosen"}</span>
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded-md" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-all"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <a href="#" className="text-orange-600 font-medium hover:underline" onClick={() => navigate("/login")}>Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;