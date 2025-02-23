const videos = [
    {
        id: "1",
        title: "How to Make Perfect Homemade Pizza from Scratch",
        thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        likes: 1234,
        category: "Food",
        comments: 89,
        prepTime: 30,
        cookTime: 15,
        difficulty: "Intermediate",
        ingredients: [
            "200g spaghetti",
            "100g pancetta",
            "2 large eggs",
            "50g Pecorino Romano",
            "50g Parmigiano Reggiano",
            "Black pepper",
            "Salt"
        ],
        steps: [
            "Bring a large pot of salted water to boil",
            "Cook pasta according to package instructions",
            "Meanwhile, crisp the pancetta in a pan",
            "Mix eggs, cheese, and pepper in a bowl",
            "Combine hot pasta with egg mixture and pancetta"
        ],
        description: "Learn how to make perfect homemade pizza from scratch in this comprehensive tutorial."
    },
    {
        id: "2",
        title: "Japanese Ramen: Traditional Recipe Guide",
        thumbnail: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        likes: 850,
        category: "Food",
        comments: 45,
        prepTime: 20,
        cookTime: 40,
        difficulty: "Intermediate",
        ingredients: [
            "200g ramen noodles",
            "1L chicken broth",
            "100g pork belly",
            "2 tbsp soy sauce",
            "1 tbsp miso paste",
            "1 egg",
            "Nori sheets",
            "Green onions"
        ],
        steps: [
            "Boil the ramen noodles according to package instructions",
            "Simmer chicken broth with soy sauce and miso paste",
            "Cook pork belly until tender",
            "Soft-boil the egg and slice green onions",
            "Assemble ramen with broth, noodles, pork, egg, and toppings"
        ],
        description: "Dive into the traditional Japanese ramen recipe with step-by-step instructions."
    },
    {
        id: "3",
        title: "Ultimate Burger Recipe - Restaurant Quality at Home",
        thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        likes: 2000,
        category: "Food",
        comments: 120,
        prepTime: 15,
        cookTime: 10,
        difficulty: "Easy",
        ingredients: [
            "500g ground beef",
            "4 burger buns",
            "1 tomato",
            "1 onion",
            "4 slices cheddar cheese",
            "Lettuce leaves",
            "Salt",
            "Pepper",
            "Ketchup"
        ],
        steps: [
            "Season ground beef with salt and pepper, form into patties",
            "Grill patties for 4-5 minutes per side",
            "Toast burger buns lightly",
            "Slice tomato and onion",
            "Assemble burgers with patties, cheese, veggies, and ketchup"
        ],
        description: "Create restaurant-quality burgers at home with this ultimate guide."
    },
    {
        id: "5",
        title: "Authentic Thai Green Curry Recipe",
        thumbnail: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        likes: 950,
        category: "Food",
        comments: 67,
        prepTime: 25,
        cookTime: 20,
        difficulty: "Moderate",
        ingredients: [
            "400ml coconut milk",
            "200g chicken breast",
            "2 tbsp green curry paste",
            "1 tbsp fish sauce",
            "1 tsp sugar",
            "1 eggplant",
            "Thai basil leaves",
            "1 red chili"
        ],
        steps: [
            "Heat coconut milk in a pan and stir in green curry paste",
            "Add sliced chicken and cook until tender",
            "Stir in fish sauce and sugar",
            "Add chopped eggplant and simmer until soft",
            "Garnish with Thai basil and sliced red chili before serving"
        ],
        description: "Experience the authentic flavors of Thai green curry with this recipe."
    },
    {
        id: "6",
        title: "French Croissants: Professional Baker's Guide",
        thumbnail: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4",
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        likes: 1100,
        category: "Food",
        comments: 78,
        prepTime: 60,
        cookTime: 25,
        difficulty: "Advanced",
        ingredients: [
            "500g all-purpose flour",
            "250g unsalted butter",
            "10g salt",
            "50g sugar",
            "25g fresh yeast",
            "250ml cold water",
            "1 egg (for egg wash)"
        ],
        steps: [
            "Mix flour, salt, sugar, yeast, and water to form a dough",
            "Roll out dough and encase butter in layers",
            "Fold and roll the dough several times, chilling between steps",
            "Shape into croissants and let rise",
            "Brush with egg wash and bake at 200°C for 20-25 minutes"
        ],
        description: "Learn how to make French croissants like a professional baker."
    },
    {
        id: "7",
        title: "Quick Vegan Stir-Fry in 20 Minutes",
        thumbnail: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://media.w3.org/2010/05/bunny/movie.mp4",
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        likes: 670,
        category: "Food",
        comments: 34,
        prepTime: 10,
        cookTime: 10,
        difficulty: "Easy",
        ingredients: [
            "200g tofu",
            "1 bell pepper",
            "1 carrot",
            "100g broccoli",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil",
            "1 tsp ginger",
            "Rice (optional)"
        ],
        steps: [
            "Cube tofu and stir-fry in sesame oil until golden",
            "Slice bell pepper and carrot, chop broccoli",
            "Add vegetables to the pan with ginger",
            "Stir in soy sauce and cook for 5-7 minutes",
            "Serve hot, optionally with rice"
        ],
        description: "A fast and delicious vegan stir-fry recipe ready in just 20 minutes."
    },
    {
        id: "8",
        title: "Classic Chocolate Cake Recipe",
        thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4",
        author: "Chef Maria",
        username: "chefmaria",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        likes: 1450,
        category: "Food",
        comments: 95,
        prepTime: 20,
        cookTime: 35,
        difficulty: "Moderate",
        ingredients: [
            "200g all-purpose flour",
            "200g sugar",
            "75g cocoa powder",
            "2 eggs",
            "100ml vegetable oil",
            "250ml milk",
            "1 tsp baking powder",
            "1 tsp vanilla extract"
        ],
        steps: [
            "Preheat oven to 180°C and grease a cake pan",
            "Mix flour, cocoa, baking powder, and sugar",
            "Beat eggs, oil, milk, and vanilla, then combine with dry ingredients",
            "Pour batter into the pan and bake for 35 minutes",
            "Cool and serve, optionally with frosting"
        ],
        description: "Bake a classic chocolate cake with this easy-to-follow recipe."
    }
];

export default videos;