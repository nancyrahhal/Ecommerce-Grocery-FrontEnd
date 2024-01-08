import "./App.css";
import Navbar from "./Components/Nabvar/Navbar.jsx";
import NearbyGroceries from "./Pages/NearbyGroceries/NearbyGroceries.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import Login from "./Pages/Login&Signup/Login.jsx";
import Signup from "./Pages/Login&Signup/Signup.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import { useEffect } from "react";
import ProtectedRoute from "./hooks/protectedRoutes.jsx";
import Home from "./Pages/Home/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import GroceryDetails from "./Pages/GroceryDetailsPage/GroceryDetails.jsx";
import Offers from "./Pages/Offers/Offers.jsx";
import OffersTables from "./Pages/Admin/Forms/OffersTables.jsx";
import GroceryTable from "./Pages/Admin/Forms/GroceryTable.jsx";
import CategoryTable from "./Pages/Admin/Forms/CategoryTable.jsx"
import ProductTabel from "./Pages/Admin/Forms/ProductTabel.jsx";
import ViewGrocery from "./Pages/Admin/Forms/ViewGrocery.jsx";

function App() {
  const { user } = useAuthContext();
  useEffect(() => {}, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        {user?.role !== "admin" && <Navbar />}
        <div className="pages">
          <Routes>
            {/* <Route path="/admin" element={user?<AdminDashboard/>:<Navigate to='/login'/>} /> */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route
                path="/admin"
                element={user ? <AdminDashboard /> : <Navigate to="/login" />}
              />
            </Route>

            <Route
              path="/admin/offer-table"
              element={<OffersTables />}
            />
            <Route
              path="/admin/grocery-table"
              element={<GroceryTable />}
            />
            <Route
              path="/admin/category-table"
              element={<CategoryTable />}
            />
            <Route
              path="/admin/product-table"
              element={<ProductTabel />}
            />
            <Route path="/profile/:id" element={<ViewGrocery />} />

            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/nearby"
              element={user ? <NearbyGroceries /> : <Navigate to="/login" />}
            />
            <Route
              path="/offers"
              element={user ? <Offers /> : <Navigate to="/login" />}
            />
            <Route path="/StoreDetails/:id" element={<GroceryDetails />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
