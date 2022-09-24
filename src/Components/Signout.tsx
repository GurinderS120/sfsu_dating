import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { app } from "../firebase_config";

const signout = async () => {
  const auth = getAuth(app);
  await signOut(auth);
};

const Signout = () => {
  return <button onClick={signout}>Logout</button>;
};

export default Signout;
