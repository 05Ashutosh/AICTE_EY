import React, { useState } from 'react';
import { Plus, X, Upload, ChefHat, Clock, Image, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const DifficultyBadge = ({ level, isSelected }) => {
    const baseClasses = "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer";
    const variants = {
        Easy: isSelected
            ? "bg-green-500 text-white"
            : "bg-green-100 text-green-600 hover:bg-green-200",
        Intermediate: isSelected
            ? "bg-yellow-500 text-white"
            : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
        Advanced: isSelected
            ? "bg-red-500 text-white"
            : "bg-red-100 text-red-600 hover:bg-red-200"
    };

    return (
        <div className={`${baseClasses} ${variants[level]}`}>
            {level}
        </div>
    );
};

const categories = [
    { value: 'appetizers', label: 'APPETIZERS' },
    { value: 'main-courses', label: 'MAIN COURSES' },
    { value: 'side-dishes', label: 'SIDE DISHES' },
    { value: 'desserts', label: 'DESSERTS' },
    { value: 'soups-salads', label: 'SOUPS & SALADS' },
    { value: 'beverages', label: 'BEVERAGES' },
    { value: 'snacks', label: 'SNACKS' },
    { value: 'vegetarian', label: 'VEGETARIAN' }
];

export const RecipeForm = () => {
    const [formData, setFormData] = useState({
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        title: '',
        prepTime: '',
        cookTime: '',
        difficulty: 'Easy',
        description: '',
        ingredients: [''],
        instructions: [''],
        category: '',
        mediaType: 'photo',
        image: null,
        video: null,
        likes: 0,
        comments: 0,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleDifficultyChange = (difficulty) => {
        setFormData((prevData) => ({
            ...prevData,
            difficulty,
        }));
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...formData.instructions];
        newInstructions[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            instructions: newInstructions,
        }));
    };

    const addIngredient = () => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, ''],
        }));
    };

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            setFormData((prevData) => ({
                ...prevData,
                ingredients: prevData.ingredients.filter((_, i) => i !== index),
            }));
        }
    };

    const addInstruction = () => {
        setFormData((prevData) => ({
            ...prevData,
            instructions: [...prevData.instructions, ''],
        }));
    };

    const removeInstruction = (index) => {
        if (formData.instructions.length > 1) {
            setFormData((prevData) => ({
                ...prevData,
                instructions: prevData.instructions.filter((_, i) => i !== index),
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const slug = formData.title.toLowerCase().replace(/ /g, '-');
        const ingredientsArray = formData.ingredients.filter(ingredient => ingredient.trim().length > 0);
        const stepsArray = formData.instructions.filter(step => step.trim().length > 0);

        const newRecipe = {
            id: Date.now(),
            author: formData.author,
            username: formData.username,
            authorAvatar: formData.authorAvatar,
            image: formData.mediaType === 'photo'
                ? (formData.image ? URL.createObjectURL(formData.image) : "/api/placeholder/800/600")
                : null,
            videoUrl: formData.mediaType === 'video' ? formData.videoUrl : null,
            title: formData.title,
            category: formData.category,
            likes: 0,
            comments: 0,
            prepTime: parseInt(formData.prepTime),
            cookTime: parseInt(formData.cookTime),
            difficulty: formData.difficulty,
            ingredients: ingredientsArray,
            steps: stepsArray,
            description: formData.description,
        };

        console.log('New Recipe:', newRecipe);
        console.log('Slug:', slug);
    };

    return (
        <div className="min-h-screen pt-16 px-4 bg-gray-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-8">
                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <ChefHat className="h-8 w-8 text-orange-500" />
                            <h2 className="text-2xl font-bold text-gray-800">Create New Recipe</h2>
                        </div>
                        <Link to="/"
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Media Type Toggle */}
                    <div className="flex gap-4 border-b pb-4">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, mediaType: 'photo' }))}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                formData.mediaType === 'photo'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <Image className="h-5 w-5" />
                            <span>Photo Recipe</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, mediaType: 'video' }))}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                formData.mediaType === 'video'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <Video className="h-5 w-5" />
                            <span>Video Recipe</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Recipe Name"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    required
                                />

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="number"
                                            name="prepTime"
                                            placeholder="Prep Time (mins)"
                                            value={formData.prepTime}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="number"
                                            name="cookTime"
                                            placeholder="Cook Time (mins)"
                                            value={formData.cookTime}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                                    <div className="flex gap-4">
                                        {['Easy', 'Intermediate', 'Advanced'].map((level) => (
                                            <div
                                                key={level}
                                                onClick={() => handleDifficultyChange(level)}
                                                className="cursor-pointer"
                                            >
                                                <DifficultyBadge
                                                    level={level}
                                                    isSelected={formData.difficulty === level}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <textarea
                                    name="description"
                                    placeholder="Recipe Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[100px]"
                                    required
                                />

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                                    <div className="space-y-2">
                                        {formData.ingredients.map((ingredient, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder={`Ingredient ${index + 1}`}
                                                    value={ingredient}
                                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeIngredient(index)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                    disabled={formData.ingredients.length === 1}
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addIngredient}
                                            className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Plus className="h-5 w-5" />
                                            <span>Add Ingredient</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                                <div className="space-y-2">
                                    {formData.instructions.map((instruction, index) => (
                                        <div key={index} className="flex gap-2">
                                            <textarea
                                                placeholder={`Step ${index + 1}`}
                                                value={instruction}
                                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeInstruction(index)}
                                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                disabled={formData.instructions.length === 1}
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addInstruction}
                                        className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus className="h-5 w-5" />
                                        <span>Add Instruction</span>
                                    </button>
                                </div>
                            </div>

                            {/* Media Upload Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {formData.mediaType === 'photo' ? 'Recipe Image' : 'Recipe Video'}
                                </label>
                                {formData.mediaType === 'photo' ? (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                        <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="video"
                                            accept="video/*"
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                        <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"/>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Link to="/"
                                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Create Recipe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecipeForm;