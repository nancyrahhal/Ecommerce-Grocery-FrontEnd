import React, { useState, useEffect } from "react";

const EditGroceryModal = ({ grocery, onClose, onUpdate }) => {
  const [editedGrocery, setEditedGrocery] = useState(grocery);
  useEffect(() => {}, [grocery]);

  const handleChange = (event) => {
    setEditedGrocery({
      ...editedGrocery,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    onUpdate(editedGrocery);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Edit Grocery</h1>
        <form className="view-form" onSubmit={handleUpdate}>
          <label htmlFor="OwnerName">Owner Name</label>
          <input
            value={editedGrocery?.admin?.username}
            type="text"
            id="OwnerName"
            name="admin.username"
            onChange={handleChange}
          />

          <label htmlFor="PhoneNumber">Number</label>
          <input
            value={editedGrocery?.phoneNumber}
            type="text"
            id="PhoneNumber"
            name="phoneNumber"
            onChange={handleChange}
          />

          <label htmlFor="City">City</label>
          <input
            value={editedGrocery?.city}
            type="text"
            id="City"
            name="city"
            onChange={handleChange}
          />

          <label htmlFor="Area">Area</label>
          <input
            value={editedGrocery?.area}
            type="text"
            id="Area"
            name="area"
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
