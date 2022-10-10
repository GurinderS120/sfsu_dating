import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import MainForm from "./Components/UserProfile/MainForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase_config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./ReduxStateManagement/hooks";
import {
  signUserIn,
  signUserOut,
} from "./ReduxStateManagement/Reducers/userReducer";
import Signout from "./Components/Signout";
import Navbar from "./Components/Navbar";
import React, { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          signUserIn({ user: { uid: userAuth.uid, email: userAuth.email } })
        );
      } else {
        dispatch(signUserOut());
      }
    });
  }, []);
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
