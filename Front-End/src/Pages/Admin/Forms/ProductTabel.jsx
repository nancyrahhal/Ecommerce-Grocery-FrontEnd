import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidbar from "./AdminSidbar";
import EditProduct from "./EditProduct";
import "./ProductTable.css";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductEdit, setSelectedProductEdit] = useState(null);
  const [storeDetails, setStoreDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    console.log("GG");
  }, [selectedProductEdit]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error in retrieving product data", error);
      }
    };

    const fetchStoreDetails = async (storeId) => {
      try {
        const response = await axios.get(`/store/${storeId}`);
        setStoreDetails((prevDetails) => ({
          ...prevDetails,
          [storeId]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    };

    const fetchCategoryDetails = async (categoryId) => {
      try {
        const response = await axios.get(`/category/${categoryId}`);
        setCategoryDetails((prevDetails) => ({
          ...prevDetails,
          [categoryId]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchProducts();

    // Fetch store details and category details for each product
    products.forEach((product) => {
      fetchStoreDetails(product.grocery[0].id);
      fetchCategoryDetails(product.category.id);
    });
  }, [refresh]); // Empty dependency array to run the effect only once when the component mounts

  const deleteProduct = async (id) => {
   const confirm =window.confirm('Are you sure you want to delete this product');
   
   if(confirm) {
      try {
        await axios.delete(`http://localhost:4000/api/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("There was an error in deleting the product", error);
      }
   }
  };

  const editProduct = (id) => {
    axios
      .get(`http://localhost:4000/api/products/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSelectedProductEdit(response.data);
      })
      .catch((error) => {
        console.error("There was an error in editing the product", error);
      });
  };

  return (
    <section className="table-container">
      <EditProduct
        product={selectedProductEdit}
        setSelectedProductEdit={setSelectedProductEdit}
        setRefresh={setRefresh}
      />
      <AdminSidbar />
      <div className="table-wrapper">
        <h1 className="table-title">Products</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>NewPrice</th>

              <th>Category</th>
              <th>Store</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.map((product, index) => (
                <tr key={index}>
                  <td>{product?.productName}</td>
                  <td>{product?.price}</td>
                  <td>{product?.newPrice}</td>
                  <td> {product.category?.categoryName} </td>
                  <td> {product.grocery[0]?.storeName} </td>
                  <td>
                    <div className="table-image">
                      <img
                        className="table-product-image"
                        src={`http://localhost:4000/${product.image}`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <div className="table-button-group">
                      <button onClick={() => editProduct(product.id)}>
                        Edit Product
                      </button>
                      <button onClick={() => deleteProduct(product.id)}>
                        Delete Product
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductTable;
