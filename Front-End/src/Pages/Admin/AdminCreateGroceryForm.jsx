import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";


const AdminCreateGroceryForm = () => {
    const [storeName, setStoreName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [storeImage, setStoreImage] = useState(null);
    const[longitude,setLongitude]=useState("")
    const[latitude,setLatitude]=useState("")

    // Form Submit Handler
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (storeName.trim() === "") return toast.error("Grocery Name is required");
      if (phoneNumber.trim() === "") return toast.error("Phone Number is required");
      if (city.trim() === "") return toast.error("City is required");
      if (longitude.trim() === "") return toast.error("longitude is required"); // Check for Location
      if (latitude.trim() === "") return toast.error("longitude is required"); // Check for Location

      // Send the form data to the server
      const formData = new FormData();
      formData.append("StoreName", storeName);
      formData.append("PhoneNumber", phoneNumber);
      formData.append("City", city);
      formData.append("Area", area);
      formData.append("StoreImage", storeImage);
      formData.append("Longitude", longitude); // Include Location in FormData
      formData.append("Latitude", latitude); // Include Location in FormData

      fetch('http://localhost:4000/api/groceries', {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            // Reset the form
            setGroceryName("");
            setPhoneNumber("");
            setCity("");
            setArea("");
            setStoreImage(null);
            setLongitude("");
            setLatitude("") // Reset Location
            toast.success("Grocery added successfully");
          } else {
            toast.error("Failed to add grocery: " + data.error);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to add grocery");
        });
    };
  
    return (
      <div className="add-category">
        <h6 className="add-category-title">Add New Grocery</h6>
        <form onSubmit={formSubmitHandler} className="add-category-form">
          <div className="add-category-form-group">
            <label htmlFor="groceryName">Grocery Name</label>
            <input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              type="text"
              id="groceryName"
              placeholder="Enter Grocery Name"
            />
            
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              id="phoneNumber"
              placeholder="Enter Phone Number"
            />
            <label htmlFor="longitude">longitude</label>
            <input
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              type="text"
              id="longitude"
              placeholder="Enter Location Longitude"
            />
            <label htmlFor="latitude">longitude</label>
            <input
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              type="text"
              id="latitude"
              placeholder="Enter Location Longitude"
            />
            <label htmlFor="city">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="city"
              placeholder="Enter City"
            />
            <label htmlFor="area">Area</label>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              type="text"
              id="area"
              placeholder="Enter Area"
            />
            <label htmlFor="groceryImage">Grocery Image</label>
            <input
              onChange={(e) => setStoreImage(e.target.files[0])}
              type="file"
              id="storeImage"
              name="storeImage"
            />
    
          </div>
          <button type="submit" className="add-category-btn">
            Add
          </button>
        </form>
      </div>
    );
  };
export default AdminCreateGroceryForm;

  
//   const [storeName, setStoreName] = useState("");
//   const [ownerName, setOwnerName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [storeImage, setStoreImage] = useState(null);
//   const[longitude,setLongitude]=useState("");
//   const[latitude,setLatitude]=useState("");

//   return (
//     <form className="create" onSubmit={handleSubmit}>
//       <h3>Add a New Workout</h3>
//       <label>Exersize Title:</label>
//       <input
//         type="text"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className={emptyFields.includes("title") ? "error" : ""}
//       />

//       <label>Load (in Kg):</label>
//       <input
//         type="number"
//         onChange={(e) => setLoad(e.target.value)}
//         value={load}
//         className={emptyFields.includes("load") ? "error" : ""}
//       />

//       <label>Reps:</label>
//       <input
//         type="number"
//         onChange={(e) => setReps(e.target.value)}
//         value={reps}
//         className={emptyFields.includes("reps") ? "error" : ""}
//       />

//       <button>Add Workout</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };
