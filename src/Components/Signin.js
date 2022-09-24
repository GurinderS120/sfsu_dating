import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { app } from "../firebase_config.ts";
import { useFormik } from "formik";
import { signinSchema } from "../Schemas/index.ts";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const signin = async (values, actions) => {
  console.log("In signin");
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    if (!userCredential.user.emailVerified) {
      console.log("Please verify your email first");
      signOut(auth);
    } else {
      console.log("User is verified");
    }

    actions.resetForm();
  } catch (err) {
    alert(err.message);
  }
};

const Signin = () => {
  // Initialize state values
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
    },
    validationSchema: signinSchema,
    onSubmit: signin,
  });

  return (
    <div>
      <div className="h-screen flex flex-col lg:flex-row items-center justify-center">
        <form
          className="flex flex-col w-60 lg:form-container"
          onSubmit={handleSubmit}
        >
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
          <button
            disabled={isSubmitting}
            className="disabled:opacity-40 btn mt-4"
            type="submit"
          >
            Login
          </button>
          <h6 className="mt-6 lg:text-center">
            Don't have an account?
            <Link to="/signup" className="ml-1 lg-nav-links">
              Sign up
            </Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default Signin;
