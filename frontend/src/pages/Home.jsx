import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import RecipeCard from '../components/RecipeCard';
import AddRecipe from '../components/AddRecipe';

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [recipes] = useState([
    {
      id: 1,
      title: 'Homemade Pizza',
      author: 'John Doe',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Classic Italian pizza with fresh ingredients'
    },
    {
      id: 2,
      title: 'Chocolate Cake',
      author: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
      description: 'Decadent triple-layer chocolate cake'
    },
    {
      id: 3,
      title: 'Garden Salad',
      author: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Fresh seasonal vegetables with house dressing'
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Image Slider */}
      <HeroSlider />

      {/* Latest Recipes Section */}
      <div className={`container mt-5 latest-recipes ${mounted ? 'slide-up' : ''}`}>
        <h2 className="mb-4 text-center delay-1">Latest Recipes</h2>
        <div className="row delay-2">
          {recipes.map(recipe => (
            <div className="col-lg-4 col-md-6 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>

      {/* Add Recipe Section */}
      <AddRecipe />

      {/* Popular Categories Section (Optional) */}
      <section className="categories-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">Explore Categories</h2>
          <div className="row g-4">
            {['Vegetarian', 'Desserts', 'Quick Meals', 'Baking', 'Grilling'].map((cat, index) => (
              <div className="col" key={index}>
                <button className="btn btn-outline-primary rounded-pill px-4">
                  {cat}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;