import React from "react";
import bgImage from "./assets/bg.jpg";
import Signup from "./pages/signup/Signup.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
   const { authUser } = useAuthContext();
   return (
      <div
         className="h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center overflow-hidden"
         style={{ backgroundImage: `url(${bgImage})` }}
      >
         <Routes>
            <Route path="/" element={ authUser ? <Home /> : <Navigate to="/login" />} />
            <Route
               path="/login"
               element={authUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
               path="/signup"
               element={authUser ? <Navigate to="/" /> : <Signup />}
            />
         </Routes>
      </div>
   );
}

export default App;
