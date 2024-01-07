import React, { useState } from 'react';
import AdminCreateGroceryForm from './AdminCreateGroceryForm.jsx';

const AdminGrocery = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateGrocery = () => {
    setShowForm(true);
  };

  const handleExitForm = () => {
    setShowForm(false);
  };

  return (
    <div className='admin-grocery-page'>
      {!showForm && (
        <button onClick={handleCreateGrocery}>Create Grocery</button>
      )}
      {showForm && (
        <div>
          <button onClick={handleExitForm}>Exit Form</button>
          <AdminCreateGroceryForm />
        </div>
      )}
    </div>
  );
};

export default AdminGrocery;