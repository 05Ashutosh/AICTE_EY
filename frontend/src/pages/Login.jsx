import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Simulate login (replace with your actual API call)
        if (email === 'test@example.com' && password === 'password123') {
            console.log('Login Successful');
            navigate('/'); // Redirect to home page on success
        } else {
            setError('Invalid email or password.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-orange-[250] to-yellow-300 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:px-10 md:py-7">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h1>
                <p className="text-gray-600 mb-4 text-center">Sign in to your account</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email Address</label> {/* sr-only for accessibility */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
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

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded-md" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-all"
                    >
                        Sign In
                    </button>

                    {/* "Forgot Password" and "Sign Up" Links */}
                    <div className="text-center mt-4">
                        <a href="#" className="text-sm text-orange-600 hover:underline">Forgot Password?</a>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Don't have an account?{' '}
                        <a href="#" className="text-orange-600 font-medium hover:underline" onClick={() => navigate("/signup")}>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;