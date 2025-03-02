import React, { useState } from 'react';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null
  });

  const [preview, setPreview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit logic here
      console.log('Recipe Submitted:', formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const validateForm = () => {
    return formData.title.trim() && 
           formData.ingredients.trim() && 
           formData.instructions.trim();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file});
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="add-recipe-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="add-recipe-content">
              <h2 className="mb-4">Share Your Secret Recipe</h2>
              <p className="lead mb-4">
                Join our community of food lovers and share your favorite recipes with the world!
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipe Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Ingredients (one per line)"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Step-by-Step Instructions"
                    value={formData.instructions}
                    onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="d-block mb-2">Add Recipe Image</label>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="img-thumbnail ms-3"
                        style={{ width: '80px', height: '80px' }}
                      />
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={!validateForm()}
                >
                  Share Recipe
                </button>

                {submitted && (
                  <div className="alert alert-success mt-3">
                    Recipe submitted successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className="col-md-6 d-none d-md-block">
            <img 
              src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Cooking" 
              className="img-fluid rounded-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddRecipe;