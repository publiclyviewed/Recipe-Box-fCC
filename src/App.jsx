import { useState, useEffect } from 'react';
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeView from "./components/RecipeView";
import { v4 as uuidv4 } from "uuid";
import './App.css';

function App() {
  const [theme, setTheme] = useState("light");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const defaultRecipes = [
    {
      id: "1",
      name: "Miso Soup",
      ingredients: ["Miso paste", "Dashi", "Tofu", "Green onions", "Wakame"],
      image: "https://www.japanesecooking101.com/wp-content/uploads/2012/03/IMG_3950.jpeg"
    },
    {
      id: "2",
      name: "Onigiri",
      ingredients: ["Cooked rice", "Nori", "Salt", "Umeboshi", "Tuna mayo"],
      image: "https://www.japanesecooking101.com/wp-content/uploads/2012/03/IMG_3950.jpeg"
    },
    {
      id: "3",
      name: "Tamagoyaki",
      ingredients: ["Eggs", "Soy sauce", "Sugar", "Mirin", "Oil"],
      image: "https://www.japanesecooking101.com/wp-content/uploads/2018/09/DSC00264b.jpg"
    }
  ];

  // Load recipes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recipebox_recipes");
      const parsed = saved ? JSON.parse(saved) : null;

      if (Array.isArray(parsed)) {
        setRecipes(parsed);
      } else {
        setRecipes(defaultRecipes);
        localStorage.setItem("recipebox_recipes", JSON.stringify(defaultRecipes));
      }
    } catch (err) {
      console.error("Failed to parse recipes from localStorage", err);
      setRecipes(defaultRecipes);
    }
  }, []);

  // Save recipes if changed
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("recipebox_recipes");
      console.log("Loaded from localStorage:", saved);
      const parsed = saved ? JSON.parse(saved) : null;
  
      if (Array.isArray(parsed) && parsed.length > 0) {
        setRecipes(parsed);
      } else {
        setRecipes(defaultRecipes);
        localStorage.setItem("recipebox_recipes", JSON.stringify(defaultRecipes));
      }
    } catch (err) {
      console.error("Failed to parse recipes from localStorage", err);
      setRecipes(defaultRecipes);
    } finally {
      setHasLoaded(true);
    }
  }, []);
  
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("recipebox_recipes", JSON.stringify(recipes));
    }
  }, [recipes, hasLoaded]);
  

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const addRecipe = (recipe) => {
    if (!recipe.name.trim() || !recipe.ingredients.length) {
      alert("Recipe must have a name and at least one ingredient.");
      return;
    }

    const newRecipe = {
      ...recipe,
      id: uuidv4(),
      image: recipe.image || "https://via.placeholder.com/150"
    };

    setRecipes([...recipes, newRecipe]);
    setShowForm(false);
  };

  const updateRecipe = (updated) => {
    if (!updated.name.trim() || !updated.ingredients.length) {
      alert("Recipe must have a name and at least one ingredient.");
      return;
    }

    const image = updated.image || "https://via.placeholder.com/150";
    setRecipes(recipes.map(r => r.id === updated.id ? { ...updated, image } : r));
    setIsEditing(false);
    setSelectedRecipe(null);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
    setSelectedRecipe(null);
  };

  return (
    <div className={`App ${theme}`}>
      <h1>📦 My Recipe Box</h1>

      <button onClick={toggleTheme}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <button onClick={() => {
        setIsEditing(false);
        setSelectedRecipe(null);
        setShowForm(true);
      }}>
        Add Recipe
      </button>

      <RecipeList
        recipes={recipes}
        onSelect={setSelectedRecipe}
        onDelete={deleteRecipe}
        onEdit={(recipe) => {
          setIsEditing(true);
          setSelectedRecipe(recipe);
          setShowForm(true);
        }}
      />

      {selectedRecipe && !isEditing && (
        <RecipeView
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {showForm && (
        <RecipeForm
          onSave={isEditing ? updateRecipe : addRecipe}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setSelectedRecipe(null);
          }}
          initialData={isEditing ? selectedRecipe : null}
        />
      )}
    </div>
  );
}

export default App;
