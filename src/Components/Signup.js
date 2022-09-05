import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { app } from "../firebase_config";

const auth = getAuth(app);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    if (email.slice(email.indexOf("@")) !== "@mail.sfsu.edu") {
      console.log("Invalid email");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      // We need to ensure that the user first verifies their password before
      // we let them sign in into our app. However, in firebase the user gets
      // signed in automatically when their account is created. So in order to
      // counter that behavior we logout the newly created user
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={signup}>
        <h1>Sign up</h1>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Register</button>
        <h6>
          Already have an account? <span>Sign in</span>
        </h6>
      </form>
    </div>
  );
};

export default Signup;
