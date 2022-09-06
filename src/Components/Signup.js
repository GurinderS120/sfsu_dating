import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { app } from "../firebase_config";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { simpleSchema } from "../Schemas";

const auth = getAuth(app);

const Signup = () => {
  const signup = async (values, actions) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(auth.currentUser);
      // We need to ensure that the user first verifies their password before
      // we let them sign in into our app. However, in firebase the user gets
      // signed in automatically when their account is created. So in order to
      // counter that behavior we logout the newly created user
      await signOut(auth);
      actions.resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: simpleSchema,
    onSubmit: signup,
  });

  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-center">
      <form className="flex flex-col w-60" onSubmit={handleSubmit}>
        {/* <h1>Sign up</h1> */}
        <input
          type="email"
          value={values.email}
          id="email"
          className={`${
            errors.email && touched.email
              ? "border-red-600 focus:border-red-600"
              : " border-gray-400 focus:border-blue-600"
          } input`}
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <p className="text-xs text-red-600 ">{errors.email}</p>
        )}
        <input
          type="password"
          id="password"
          value={values.password}
          className={`${
            errors.password && touched.password
              ? "border-red-600 focus:border-red-600"
              : " border-gray-400 focus:border-blue-600"
          } input mt-4`}
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <p className="text-xs text-red-600 ">{errors.password}</p>
        )}
        <input
          type="password"
          id="confirmPassword"
          value={values.confirmPassword}
          className={`${
            errors.confirmPassword && touched.confirmPassword
              ? "border-red-600 focus:border-red-600"
              : " border-gray-400 focus:border-blue-600"
          } input mt-4`}
          placeholder="Confirm Password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-xs text-red-600 ">{errors.confirmPassword}</p>
        )}
        <button
          disabled={isSubmitting}
          className="disabled:opacity-40 btn mt-4"
          type="submit"
        >
          Register
        </button>
        <h6 className="mt-6">
          Already have an account?
          <Link to="/signin" className="ml-1 lg-nav-links">
            Sign in
          </Link>
        </h6>
      </form>
    </div>
  );
};

export default Signup;
