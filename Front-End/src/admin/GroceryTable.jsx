// src/components/GroceryTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidbar from './AdminSidbar';
import ViewGrocery from './ViewGrocery';
import EditGroceryModal from './EditGroceryModal';

const GroceryTable = () => {
  const [groceries, setGroceries] = useState([]);
  const [selectedGrocery, setSelectedGrocery] = useState(null);
  const [selectedGroceryEdit, setSelectedGroceryEdit] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'/groceries')
      .then(response => {
        setGroceries(response.data);
      })
      .catch(error => {
        console.error('There was an error in view', error);
      });
  }, []);

  const deleteGrocery = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/groceries/${id}`)
      .then(response => {
        console.log(response.data);
        setGroceries(groceries.filter(grocery => grocery._id !== id));
      })
      .catch(error => {
        console.error('There was an error in deleting', error);
      });
  };

  const editGrocery = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groceries/${id}`)
      .then(response => {
        setSelectedGroceryEdit(response.data);
      })
      .catch(error => {
        console.error('There was an error in editing', error);
      });
  };

  const updateGrocery = (updatedGrocery) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/groceries/${updatedGrocery._id}`, updatedGrocery)
      .then(response => {
        console.log(response.data);
        setGroceries(prevGroceries =>
          prevGroceries.map(grocery =>
            grocery._id === updatedGrocery._id ? updatedGrocery : grocery
          )
        );
      })
      .catch(error => {
        console.error('There was an error in updating', error);
      });
  };

  return (
    <section className="table-container">
      <AdminSidbar />
      <div className="table-wrapper">
        <h1 className="table-title">Grocery</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Grocery Name</th>
              <th>Owner</th>
              <th>Phone</th>
              <th>Location</th>
              <th>City</th>
              <th>Area</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groceries.map((grocery, index) => (
              <tr key={index}>
                <td>{grocery.StoreName}</td>
                <td>{grocery.OwnerName}</td>
                <td>{grocery.PhoneNumber}</td>
                <td>{grocery.Location}</td>
                <td>{grocery.City}</td>
                <td>{grocery.Area}</td>
                <td>
                  <div className="table-image">
                    <img className="table-offer-image" src={grocery.StoreImage} alt="" />
                  </div>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => setSelectedGrocery(grocery)}>View Grocery</button>
                    <button onClick={() => editGrocery(grocery._id)}>Edit Grocery</button>
                    <button onClick={() => deleteGrocery(grocery._id)}>Delete Grocery</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedGrocery && (
        <ViewGrocery grocery={selectedGrocery} />
      )}

      {selectedGroceryEdit && (
        <EditGroceryModal
          grocery={selectedGroceryEdit}
          onUpdate={updateGrocery}
          onClose={() => setSelectedGroceryEdit(null)}
        />
      )}
    </section>
  );
};

export default GroceryTable;
