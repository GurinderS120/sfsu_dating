import * as yup from "yup";
import dayjs from "dayjs";

const SUPPORTED_FILE_FORMATS = ["image/jpeg", "image/png"];

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
    .matches(/(.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .matches(/(.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .matches(/(.*\d)/, {
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
    .matches(/(.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .matches(/(.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .matches(/(.*\d)/, {
      message: "Password must contain at least one number",
    })
    .required("Required"),
});

export const nameSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Name must be at least 1 character long")
    .max(100, "Please enter a nickname")
    .matches(
      /^[\S]+(\s+[\S]+)*$/,
      "Please remove spaces from the beginning and end"
    )
    .required("Required"),
});

export const birthdaySchema = yup.object().shape({
  birthday: yup
    .string()
    .required("Required")
    .test("birthday", "You must be at least 18 years old", (date) => {
      return dayjs().diff(dayjs(date), "year") >= 18;
    }),
});

export const genderSchema = yup.object().shape({
  gender: yup.string().required("Required"),
});

export const interestSchema = yup.object().shape({
  interest: yup.string().required("Required"),
});

export const relationSchema = yup.object().shape({
  relation: yup.string().required("Required"),
});

export const activitiesSchema = yup.object().shape({
  activities: yup.array().min(1, "Required"),
});

export const picSchema = yup.object().shape({
  pic: yup
    .mixed()
    .required("Required")
    .test(
      "FILE_FORMAT",
      "Only jpg/jpeg, png image files are allowed",
      (value) => {
        return value && SUPPORTED_FILE_FORMATS.includes(value.type);
      }
    ),
});
