import { useState, useEffect } from "react";

function RecipeForm({ onSave, onCancel, initialData }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIngredients(initialData.ingredients.join(", "));
      setImage(initialData.image || "");
      setInstructions(initialData.instructions || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      id: initialData?.id || null,
      name,
      ingredients: ingredients.split(",").map(i => i.trim()).filter(Boolean),
      image,
      instructions,
    };

    onSave(recipe);
  };

  return (
    <div>
      <h2>{initialData ? "Edit Recipe" : "New Recipe"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g., Sushi Rolls"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <textarea
          placeholder="List ingredients here, separated by commas (e.g., Rice, Nori, Salmon)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
          required
        />
        <textarea
          placeholder="Enter instructions here (e.g., Mix, bake for 20 mins...)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={5}
          style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
          required
        />
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default RecipeForm;
