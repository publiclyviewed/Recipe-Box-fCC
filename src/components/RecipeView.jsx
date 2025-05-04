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
    <div className="recipe-view" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '2rem',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '2rem auto',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
    }}>
     <div className="section-box">
      <h2>{recipe.name}</h2>
      </div>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}

<div className="section-box">
  <h4>Ingredients:</h4>
  <p>{recipe.ingredients.join(', ')}</p>
</div>

<div className="section-box">
  <h4>Instructions:</h4>
  <p>{recipe.instructions || "No instructions provided."}</p>
</div>


      <button onClick={onClose} style={{
        marginTop: "1rem",
        padding: '0.5rem 1rem',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>Close</button>
    </div>
  );
}

export default RecipeView;
