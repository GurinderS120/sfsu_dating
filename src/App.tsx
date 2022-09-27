import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import MainForm from "./Components/UserProfile/MainForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signout from "./Components/Signout";
import Navbar from "./Components/Navbar";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/app/userprofile" element={<MainForm />} />
          <Route path="/signout" element={<Signout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
