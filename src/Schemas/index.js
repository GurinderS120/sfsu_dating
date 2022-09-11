import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/.*@mail[.]sfsu[.]edu/, {
      message: "Please enter a valid SFSU email",
    })
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(/(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .matches(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .matches(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/.*@mail[.]sfsu[.]edu/, {
      message: "Please enter a valid SFSU email",
    })
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(/(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .matches(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .matches(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
    .required("Required"),
});

export const nameSchema = yup.object().shape({
  name: yup.string().min(2).max(22).required("Required"),
});
