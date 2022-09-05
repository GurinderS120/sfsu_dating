import { useState } from "react";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { app } from "../firebase_config";

const auth = getAuth(app);

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        console.log("Please verify your email first");
        signOut(auth);
      } else {
        console.log("User is verified");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={signin}>
        <h1>Sign in</h1>
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
        <button type="submit">Login</button>
        <h6>
          Don't have an account? <span>Sign up</span>
        </h6>
      </form>
    </div>
  );
};

export default Signin;
