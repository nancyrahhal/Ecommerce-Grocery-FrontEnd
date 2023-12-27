// src/components/EditGroceryModal.js
import React, { useState } from 'react';

const EditGroceryModal = ({ grocery, onClose, onUpdate }) => {
  const [editedGrocery, setEditedGrocery] = useState(grocery);

  const handleChange = (event) => {
    setEditedGrocery({
      ...editedGrocery,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    onUpdate(editedGrocery);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Edit Grocery</h1>
        <form className="view-form" onSubmit={handleUpdate}>
          <label htmlFor="Name">Owner Name</label>
          <input
            value={editedGrocery.OwnerName}
            type="text"
            id="Name"
            name="OwnerName"
            onChange={handleChange}
          />

          <label htmlFor="Number">Number</label>
          <input
            value={editedGrocery.PhoneNumber}
            type="text"
            id="Number"
            name="PhoneNumber"
            onChange={handleChange}
          />

          <label htmlFor="Location">Location</label>
          <input
            value={editedGrocery.Location}
            type="text"
            id="Location"
            name="Location"
            onChange={handleChange}
          />

          <label htmlFor="City">City</label>
          <input
            value={editedGrocery.City}
            type="text"
            id="City"
            name="City"
            onChange={handleChange}
          />

          <label htmlFor="Area">Area</label>
          <input
            value={editedGrocery.Area}
            type="text"
            id="Area"
            name="Area"
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditGroceryModal;
