import "./App.css";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import UserProfile from "./Components/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signout from "./Components/Signout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/signout" element={<Signout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
