import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { app } from "../firebase_config";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import InputField from "./FormikComponents/InputField";
import { signinSchema } from "../Schemas/index";
import { Link } from "react-router-dom";
import React from "react";
import HandleError from "../ErrorHandling";

// Create an interface of values that we will be using in our form
interface Values {
  email: string;
  password: string;
}

const signin = async (values: Values, actions: FormikHelpers<Values>) => {
  const auth = getAuth(app);

  try {
    const userInfo = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    if (!userInfo.user.emailVerified) {
      alert("Please verify your email first");
      signOut(auth);
    }
    actions.resetForm();
  } catch (error) {
    HandleError(error);
  }
};

const Signin = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={signin}
    validationSchema={signinSchema}
  >
    <div>
      <div className="h-screen flex flex-col lg:flex-row items-center justify-center">
        <Form className="flex flex-col w-60 lg:form-container">
          <InputField type="email" name="email" placeholder="Email" />
          <ErrorMessage component="p" name="email" className="inp-err-mssg" />
          <InputField type="password" name="password" placeholder="Password" />
          <ErrorMessage
            component="p"
            name="password"
            className="inp-err-mssg"
          />
          <button className="btn mt-4" type="submit">
            Login
          </button>
          <h6 className="mt-6 text-sm lg:text-base text-center">
            Don't have an account?
            <Link to="/signup" className="ml-1 lg-nav-links">
              Sign up
            </Link>
          </h6>
        </Form>
      </div>
    </div>
  </Formik>
);

export default Signin;
