import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { app } from "../firebase_config";

const auth = getAuth(app);

const signout = async () => {
  await signOut(auth);
};

const Signout = () => {
  return <button onClick={signout}>Logout</button>;
};

export default Signout;
