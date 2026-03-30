import { supabase } from "../supabase";
import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login"; 
import Register from "./screens/Register"; 
import DashboardScreen from "./DashboardScreen";

function Auth() { 
   return (
    <BrowserRouter>
        <Routes> 
        
            {/* dashboard */}
            <Route path="/" element={<DashboardScreen />} />

            {/* register */}
            <Route path="/register" element={<Register />} />

             {/* dashboard */}
             <Route path="/DashboardScreen" element={<DashboardScreen />} />

        </Routes>
    </BrowserRouter>
   )

}

export default Auth 