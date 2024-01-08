import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProduct = ({ product, setSelectedProductEdit, setRefresh }) => {
  const defaultState = {
    productName: "",
    price: 0,
    category: { id: "" },
    grocery: { id: "" },
    newPrice: 0,
    itsOffer: 0,
  };

  const [editedProduct, setEditedProduct] = useState(defaultState);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, [product]);

  const fetchStores = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/groceries");
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/categories/ofGrocery/${product?.grocery[0]?.id}`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }

    fetchCategories();
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:4000/api/products/${editedProduct.id}`,
        editedProduct
      )
      .then((response) => {
        console.log(response.data);
        setEditedProduct(defaultState);
        setSelectedProductEdit(null);
        setRefresh();
      })
      .catch((error) => {
        console.error("There was an error in editing", error);
      });
  };

  if (!product || editedProduct === defaultState) {
    return null;
  }

  return (
    <div className="edit-container">
      <h1 className="edit-title">Edit Product</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>
        <input
          value={editedProduct.productName}
          type="text"
          id="productName"
          name="productName"
          onChange={handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          value={editedProduct.price}
          type="number"
          id="price"
          name="price"
          onChange={handleChange}
        />

        <label htmlFor="categoryId">Category</label>
        <select
          value={editedProduct.category.id}
          onChange={handleChange}
          id="categoryId"
          name="category"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <label htmlFor="newPrice">New Price</label>
        <input
          value={editedProduct.newPrice}
          type="number"
          id="newPrice"
          name="newPrice"
          onChange={handleChange}
        />

        <label htmlFor="itsOffer">Is Offer</label>
        <input
          type="checkbox"
          checked={editedProduct.itsOffer === 1}
          id="itsOffer"
          name="itsOffer"
          onChange={(event) =>
            setEditedProduct((prevProduct) => ({
              ...prevProduct,
              itsOffer: event.target.checked ? 1 : 0,
            }))
          }
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
