import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminDashboard from "./pages/Admin/adminDashboard/adminDashboard.jsx";
import { useEffect } from "react";
import ProtectedRoute from "./hooks/protectedRoutes.jsx";

function App() {
  const {user}=useAuthContext()
  useEffect(() =>{
  },[user])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          
          
            {/* <Route path="/admin" element={user?<AdminDashboard/>:<Navigate to='/login'/>} /> */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={user?<AdminDashboard />:<Navigate to='/login'/>} />
      </Route>
      
      
            <Route path="/" element={user?<Home />:<Navigate to='/login'/>} />
            <Route path='/login' element={!user?<Login/>:<Navigate to='/'/>}/>
            <Route path='/signup' element={!user?<Signup/>:<Navigate to='/'/>}/>
            <Route path='/signup' element={!user?<Signup/>:<Navigate to='/'/>}/>
            <Route path='/signup' element={!user?<Signup/>:<Navigate to='/'/>}/>
            <Route path='/signup' element={!user?<Signup/>:<Navigate to='/'/>}/>
            <Route path='/signup' element={!user?<Signup/>:<Navigate to='/'/>}/>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;