// src/components/EditGroceryModal.js
import React, { useState,useEffect} from "react";


const EditGroceryModal = ({ grocery, onClose, onUpdate }) => {
  const [editedGrocery, setEditedGrocery] = useState(grocery);
  useEffect(() => {}, [grocery]);

  console.log("editedGrocery", editedGrocery)

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
            value={editedGrocery?.admin?.username}
            type="text"
            id="Name"
            name="OwnerName"
            onChange={handleChange}
          />

          <label htmlFor="Number">Number</label>
          <input
            value={editedGrocery?.phoneNumber}
            type="text"
            id="Number"
            name="PhoneNumber"
            onChange={handleChange}
          />

          <label htmlFor="City">City</label>
          <input
            value={editedGrocery?.city}
            type="text"
            id="City"
            name="City"
            onChange={handleChange}
          />

          <label htmlFor="Area">Area</label>
          <input
            value={editedGrocery?.area}
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
