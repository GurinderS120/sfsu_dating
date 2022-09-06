import * as yup from "yup";

export const simpleSchema = yup.object().shape({
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
