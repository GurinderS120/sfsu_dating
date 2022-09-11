import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { nameSchema } from "../../Schemas/index";

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
      onSubmit={submitProfile}
    >
      <Form
        autoComplete="off"
        className="flex flex-col h-screen justify-center items-center"
      >
        <Field name="name" type="text" placeholder="Name" />
        <Field name="birthday" type="date" />
        <div>
          <label>
            <Field name="gender" type="radio" value="female" /> Female
          </label>
          <label>
            <Field name="gender" type="radio" value="male" /> Male
          </label>
          <label>
            <Field name="gender" type="radio" value="Non-binary" /> Non-binary
          </label>
        </div>
        <Field name="pic" type="file" />
      </Form>
    </Formik>
  );
};

export default MainForm;
