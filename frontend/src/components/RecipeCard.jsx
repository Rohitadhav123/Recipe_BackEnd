import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card">
      <img src={recipe.image} className="card-img-top" alt={recipe.title} />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">{recipe.description}</p>
        <p className="text-muted">By {recipe.author}</p>
        <button className="btn btn-primary">View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;