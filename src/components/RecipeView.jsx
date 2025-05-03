import React, { useEffect } from 'react';

function RecipeView({ recipe, onClose }) {
  useEffect(() => {
    if (recipe.image) {
      document.getElementById("root").style.backgroundImage = `url(${recipe.image})`;
      document.getElementById("root").style.backgroundSize = 'cover';
      document.getElementById("root").style.backgroundPosition = 'center';
    }

    return () => {
      document.getElementById("root").style.backgroundImage = '';
    };
  }, [recipe]);

  return (
    <div className="recipe-view">
      <h2>{recipe.name}</h2>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      <h4>Ingredients:</h4>
      <ul style={{ lineHeight: '1.6' }}>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <button onClick={onClose} style={{ marginTop: "1rem" }}>Close</button>
    </div>
  );
}

export default RecipeView;
