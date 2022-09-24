import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase_config.ts";

const auth = getAuth(app);

const Signout = () => {
  const signout = async (e) => {
    await signOut(auth);
  };

  return <button onClick={signout}>Logout</button>;
};

export default Signout;
