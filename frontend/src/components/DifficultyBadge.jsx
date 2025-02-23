const DifficultyBadge = ({ level, isSelected, onClick }) => {
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
        <div
            className={`${baseClasses} ${variants[level]}`}
            onClick={onClick}
        >
            {level}
        </div>
    );
};