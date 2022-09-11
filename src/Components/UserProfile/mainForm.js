import { useState } from "react";
import { Form, Formik, useField, FormikConfig, FormikValues } from "formik";
import { profileSchema } from "../../Schemas/index";

const InputField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        className={`${
          meta.touched && meta.error ? "invalid-input " : "valid-input "
        }input`}
        {...field}
        {...props}
      />
      {meta.error && meta.touched && (
        <p className="inp-err-mssg">{meta.error}</p>
      )}
    </>
  );
};

const MainForm = () => {
  const submitProfile = () => {};

  return (
    <FormikStepper
      initialValues={{
        name: "",
        birthday: "",
        gender: "",
        pic: "",
      }}
      validationSchema={profileSchema}
      onSubmit={submitProfile}
    >
      <Form
        autoComplete="off"
        className="flex flex-col h-screen justify-center items-center"
      >
        <InputField name="name" type="text" placeholder="Name" />
        <InputField name="birthday" type="date" />
        <div>
          <label>
            <InputField name="gender" type="radio" value="female" /> Female
          </label>
          <label>
            <InputField name="gender" type="radio" value="male" /> Male
          </label>
          <label>
            <InputField name="gender" type="radio" value="Non-binary" />{" "}
            Non-binary
          </label>
        </div>
        <InputField name="pic" type="file" />
      </Form>
    </FormikStepper>
  );
};

const FormikStepper = ({ children, ...props }) => {
  return (
    <Formik {...props}>
      <Form autoComplete="off">{children}</Form>
    </Formik>
  );
};

export default MainForm;
