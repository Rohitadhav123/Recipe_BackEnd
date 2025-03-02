import React from 'react';

const Profile = () => {
  return (
    <div className="container mt-4">
      <h2>My Recipes</h2>
      <div className="row">
        {/* Add your recipe listing here */}
        <div className="col-12">
          <div className="alert alert-info">
            You haven't posted any recipes yet!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;