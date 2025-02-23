import { useState, useEffect } from "react";

function SearchInput() {
    const [placeholderText, setPlaceholderText] = useState("What do you want to cook today?");

    useEffect(() => {
        const updatePlaceholder = () => {
            if (window.innerWidth < 768) {
                setPlaceholderText("Search Recipe");
            } else {
                setPlaceholderText("What do you want to cook today?");
            }
        };

        updatePlaceholder();

        window.addEventListener("resize", updatePlaceholder);

        return () => window.removeEventListener("resize", updatePlaceholder);
    }, []); // Empty dependency array means this runs once on mount

    return (
        <input
            type="text"
            placeholder={placeholderText}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}

export default SearchInput;