import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";


function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user?<Home />:<Navigate to='/login'/>} />
            <Route path='/login' element={!user?<Login/>:<Navigate to='/'/>}/>
            <Route path='/signup' element={!user?<Signup/>:<Navigate to='/'/>}/>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
