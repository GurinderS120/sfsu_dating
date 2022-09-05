import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase_config";

const auth = getAuth(app);

const Signout = () => {
  const signout = async (e) => {
    await signOut(auth);
  };

  return <button onClick={signout}>Logout</button>;
};

export default Signout;
