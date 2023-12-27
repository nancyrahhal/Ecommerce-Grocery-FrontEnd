import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProduct = ({ product, setSelectedProductEdit }) => {
  const defaultState = {
    productName: "",
    price: 0,
    categoryID: "",
    storeID: "",
    newprice: 0,
    itsnew: false,
  };
  const [editedProduct, setEditedProduct] = useState(defaultState);

  useEffect(() => {
    if (product) {
      setEditedProduct(product);

      console.log(product);
    }
  }, [product]);

  const handleChange = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/product/${editedProduct?._id}`,
        editedProduct
      )
      .then((response) => {
        console.log(response.data);
        setEditedProduct(defaultState);
        setSelectedProductEdit(null);
      })
      .catch((error) => {
        console.error("There was an error in editing", error);
      });
  };

  if (!product || editedProduct === defaultState) return <></>;

  return (
    <div className="edit-container">
      <h1 className="edit-title">Edit Product</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>
        <input
          value={editedProduct?.productName}
          type="text"
          id="productName"
          name="productName"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="price">Price</label>
        <input
          value={editedProduct?.price}
          type="number"
          id="price"
          name="price"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="categoryID">Category</label>
        <input
          value={editedProduct?.categoryID}
          type="text"
          id="categoryID"
          name="categoryID"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="storeID">Store</label>
        <input
          value={editedProduct?.storeID}
          type="text"
          id="storeID"
          name="storeID"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="newprice">New Price</label>
        <input
          value={editedProduct?.newprice}
          type="number"
          id="newprice"
          name="newprice"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="itsnew">Is New</label>
        <input
          type="checkbox"
          checked={editedProduct?.itsnew}
          id="itsnew"
          name="itsnew"
          onChange={(event) =>
            setEditedProduct({
              ...editedProduct,
              itsnew: event.target.checked,
            })
          }
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
