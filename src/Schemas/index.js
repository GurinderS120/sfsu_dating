import * as yup from "yup";
import dayjs from "dayjs";

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

export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(22)
    .required("Required"),
  birthday: yup
    .string()
    .required("Required")
    .test("birthday", "You must be at least 18 years old", (date) => {
      return dayjs().diff(dayjs(date), "year") >= 18;
    }),
});
