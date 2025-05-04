import React from 'react';

function RecipeList({ recipes, onSelect, onDelete, onEdit }) {
  return (
    <div>
      <div className="section-box"><h2>Recipes</h2></div>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id} className="recipe-item">
              <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p>{recipe.ingredients.join(", ")}</p>
              </div>
              <div className="recipe-actions">
                <button onClick={() => onSelect(recipe)}>View</button>
                <button onClick={() => onEdit(recipe)}>Edit</button>
                <button onClick={() => onDelete(recipe.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
}

export default RecipeList;
