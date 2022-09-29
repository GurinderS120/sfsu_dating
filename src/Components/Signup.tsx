import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { app } from "../firebase_config";
import { Link } from "react-router-dom";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import InputField from "./FormikComponents/InputField";
import { signupSchema } from "../Schemas/index";
import HandleError from "../ErrorHandling";
import React from "react";

// Create an interface of values that we will be using in our form
interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

const signup = async (values: Values, actions: FormikHelpers<Values>) => {
  const auth = getAuth(app);

  try {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await sendEmailVerification(userInfo.user);
    // We need to ensure that the user first verifies their password before
    // we let them sign in into our app. However, in firebase the user gets
    // signed in automatically when their account is created. So in order to
    // counter that behavior we logout the newly created user
    await signOut(auth);
    actions.resetForm();
  } catch (error) {
    HandleError(error);
  }
};

const Signup = () => (
  <Formik
    initialValues={{ email: "", password: "", confirmPassword: "" }}
    onSubmit={signup}
    validationSchema={signupSchema}
  >
    <div className="h-screen flex flex-col mt-[8rem] items-center">
      <Form className="flex flex-col w-60 lg:form-container">
        <h3 className="form-step-header">Register</h3>
        <InputField type="email" name="email" placeholder="Email" />
        <ErrorMessage component="p" name="email" className="inp-err-mssg" />
        <InputField type="password" name="password" placeholder="Password" />
        <ErrorMessage component="p" name="password" className="inp-err-mssg" />
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Password"
        />
        <ErrorMessage
          component="p"
          name="confirmPassword"
          className="inp-err-mssg"
        />
        <button className="btn mt-4" type="submit">
          Register
        </button>
        <h6 className="mt-6 text-sm lg:text-base text-center">
          Already have an account?
          <Link to="/signin" className="ml-1 lg-nav-links">
            Sign in
          </Link>
        </h6>
      </Form>
    </div>
  </Formik>
);

export default Signup;
