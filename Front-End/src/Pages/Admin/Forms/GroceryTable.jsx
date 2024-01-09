// src/components/GroceryTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidbar from "./AdminSidbar";
import ViewGrocery from "./ViewGrocery";
import EditGroceryModal from "./EditGroceryModal";

const GroceryTable = () => {
  const [groceries, setGroceries] = useState([]);
  const [selectedGrocery, setSelectedGrocery] = useState(null);
  const [selectedGroceryEdit, setSelectedGroceryEdit] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/groceries")
      .then((response) => {
        setGroceries(response.data);
      })
      .catch((error) => {
        console.error("There was an error in view", error);
      });
  }, []);

  const deleteGrocery = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to Delete this Grocery"
    );

    if (confirm) {
      axios
        .delete(`http://localhost:4000/api/groceries/${id}`)
        .then((response) => {
          console.log(response.data);
          setGroceries(groceries.filter((grocery) => grocery.id !== id));
        })
        .catch((error) => {
          console.error("There was an error in deleting", error);
        });
    }
  };

  // const editGrocery = (id) => {
  //   axios
  //     .get(`http://localhost:4000/api/groceries/${id}`)
  //     .then((response) => {
  //       setSelectedGroceryEdit(response.data);
  //       console.log("fromres");
  //       setSelectedGrocery(null); // Clear the selected grocery for viewing
  //     })
  //     .catch((error) => {
  //       console.error("There was an error in editing", error);
  //     });
  // };

  const updateGrocery = (updatedGrocery) => {
    axios
      .put(
        `http://localhost:4000/api/groceries/${updatedGrocery.id}`,
        updatedGrocery
      )
      .then((response) => {
        console.log(response.data);
        setGroceries((prevGroceries) =>
          prevGroceries.map((grocery) =>
            grocery.id === updatedGrocery.id ? updatedGrocery : grocery
          )
        );
      })
      .catch((error) => {
        console.error("There was an error in updating", error);
      });
  };

  console.log("gr", groceries);

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
              <th>City</th>
              <th>Area</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groceries.map((grocery, index) => (
              <tr key={index}>
                <td>{grocery.storeName}</td>
                <td>{grocery.admin?.username}</td>
                <td>{grocery.phoneNumber}</td>
                <td>{grocery.city}</td>
                <td>{grocery.area}</td>
                <td>
                  <div className="table-image">
                    <img
                      className="table-offer-image"
                      src={`http://localhost:4000/uploads/${grocery.storeImage}`}
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => setSelectedGrocery(grocery)}>
                      View Grocery
                    </button>
                    <button onClick={() =>
                       { setSelectedGroceryEdit(null);setSelectedGroceryEdit(grocery)}
                      }
                    >
                      Edit Grocery
                    </button>

                    <button onClick={() => deleteGrocery(grocery.id)}>
                      Delete Grocery
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedGrocery && <ViewGrocery grocery={selectedGrocery} />}

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
