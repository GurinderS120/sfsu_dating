import { useState } from "react";
import { Form, Formik, ErrorMessage, useField } from "formik";
import { profileSchema } from "../../Schemas/index";

const InputField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <input
      className={`${
        meta.touched && meta.error ? "invalid-input " : "valid-input "
      }input`}
      {...field}
      {...props}
    />
  );
};

const MainForm = () => {
  const submitProfile = () => {};

  return (
    <Formik
      initialValues={{
        name: "",
        birthday: "",
        gender: "",
        connect: "",
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
        <ErrorMessage name="name" component="p" className="inp-err-mssg" />
        <InputField name="birthday" type="date" />
        <ErrorMessage name="birthday" component="p" className="inp-err-mssg" />
        <div>
          <label>
            <InputField name="gender" type="radio" value="female" /> Female
            <ErrorMessage
              name="gender"
              component="p"
              className="inp-err-mssg"
            />
          </label>
          <label>
            <InputField name="gender" type="radio" value="male" /> Male
            <ErrorMessage
              name="gender"
              component="p"
              className="inp-err-mssg"
            />
          </label>
          <label>
            <InputField name="gender" type="radio" value="Non-binary" />{" "}
            Non-binary
            <ErrorMessage
              name="gender"
              component="p"
              className="inp-err-mssg"
            />
          </label>
        </div>
        <InputField name="pic" type="file" />
        <ErrorMessage name="pic" component="p" className="inp-err-mssg" />
      </Form>
    </Formik>
  );
};

export default MainForm;
