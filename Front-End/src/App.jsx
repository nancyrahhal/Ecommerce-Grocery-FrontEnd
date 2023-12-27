import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//pages and components
import Home from "./pages/Homepage/Home";
import Navbar from "./components/Navbar/navbar";
import Offers from "./pages/Homepage/Offers/Offers";
import StoreDetails from "./pages/Homepage/StoreDetails/StoreDetails";
import Footer from "./components/Navbar/footer/footer"
import AdminDashBoard from "./admin/AdminDashBoard";
import OffersTables from "./admin/OffersTables";
import GroceryTable from "./admin/GroceryTable";
import CategoryTable from "./admin/CategoryTable";
import ProductTabel from "./admin/ProductTabel";
import ViewGrocery from "./admin/ViewGrocery";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Offers" element={<Offers />} />
            <Route path="/StoreDetails/:storeName" element={<StoreDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/admin-dashbord" element={<AdminDashBoard/>}/>
            <Route path="/admin-dashbord/offer-table" element={<OffersTables/>}/>
            <Route path="/admin-dashboard/grocery-table" element={<GroceryTable />}/>
            <Route path="/admin-dashboard/category-table" element={<CategoryTable/>}/>
            <Route path="/admin-dashboard/product-table" element={<ProductTabel/>}/>
            <Route path="/profile/:id" element={<ViewGrocery/>}/>
          </Routes>
          <Footer />
        </div>
 
      </BrowserRouter>
    </div>
  );
}

export default App;
