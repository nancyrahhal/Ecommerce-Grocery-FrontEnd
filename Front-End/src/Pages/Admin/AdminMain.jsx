// import React from "react";
// import { Link } from "react-router-dom";
// import AddCategoryForm from "./AddCategoryForm";
// import AddGrocery from "./AddGrocery";
// import AddProducts from "./AddProducts";
// import { useState,useEffect } from "react";
// import axios from "axios";

// const AdminMain = () => {
//   const [groceries, setGroceries] = useState([]);
//   const [products,setProducts]=useState([])
//   const [offer,setOffer]=useState([])
//   const [category,setCategory]=useState([])

//   useEffect(()=>{
//     axios.get(`${process.env.REACT_APP_API_URL}/product`)
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error in get products ', error);
//       });
//   },[])

//   useEffect(() => {
//     axios.get(process.env.REACT_APP_API_URL+'/groceries')
//       .then(response => {
//         setGroceries(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error in view', error);
//       });
//    }, []);

//    useEffect(() => {
//     axios.get(process.env.REACT_APP_API_URL+'/offers')
//       .then(response => {
//         setOffer(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error in get offer', error);
//       });
//    }, []);

//    useEffect(() => {
//     axios.get(process.env.REACT_APP_API_URL+'/category')
//       .then(response => {
//         setCategory(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error in get offer', error);
//       });
//    }, []);

//    const groceryCount=groceries.length;
//    const productCount=products.length;
//    const offerCount=offer.length;
//    const categoryCount=category.length;

//   return (
//     <div className="admin-main">
//     <div className="admin-main-header">
//       <div className="admin-main-card">
//         <h5 className="admin-card-title">Offers</h5>
//         <div className="admin-card-count">{offerCount}</div>
//         <div className="admin-card-link-wrapper">
//           <Link to="/admin-dashbord/offer-table" className="admin-card-link">
//             See all offers
//           </Link>
//           <div className="admin-card-icon">
//             <i className="bi bi-emoji-smile"></i>
//           </div>
//         </div>
//       </div>
//       <div className="admin-main-card">
//         <h5 className="admin-card-title">Groceries</h5>
//         <div className="admin-card-count">{groceryCount}</div>
//         <div className="admin-card-link-wrapper">
//           <Link to="/admin-dashboard/grocery-table" className="admin-card-link">
//             See all Groceries
//           </Link>
//           <div className="admin-card-icon">
//             <i className="bi bi-shop"></i>
//           </div>
//         </div>
//       </div>
//       <div className="admin-main-card">
//         <h5 className="admin-card-title">Categories</h5>
//         <div className="admin-card-count">{categoryCount}</div>
//         <div className="admin-card-link-wrapper">
//           <Link
//             to="/admin-dashboard/category-table"
//             className="admin-card-link"
//           >
//             See all categories
//           </Link>
//           <div className="admin-card-icon">
//             <i className="bi bi-tag-fill"></i>
//           </div>
//         </div>
//       </div>
//       <div className="admin-main-card">
//         <h5 className="admin-card-title">Products</h5>
//         <div className="admin-card-count">{productCount}</div>
//         <div className="admin-card-link-wrapper">
//           <Link
//             to="/admin-dashboard/product-table"
//             className="admin-card-link"
//           >
//             See all products
//           </Link>
//           <div className="admin-card-icon">
//             <i className="bi bi-cart-check"></i>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="add-new-grocery-category">
//     <AddCategoryForm />
//     <AddGrocery/>
//     <AddProducts/>
//     </div>
//   </div>

    
//   );
// };

// export default AdminMain;
import React from 'react'

const AdminMain = () => {
  return (
    <div>
      main admin page
    </div>
  )
}

export default AdminMain
