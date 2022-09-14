import React, { useState } from "react";
import { Form, Formik, useField } from "formik";
import {
  genderSchema,
  nameAndBirthdaySchema,
  picSchema,
} from "../../Schemas/index";
import PreviewImage from "./previewImage";

const inputSchemas = [nameAndBirthdaySchema, genderSchema, picSchema];

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
  const submitProfile = (values, action) => {
    console.log(values);
  };

  return (
    <FormikStepper
      initialValues={{
        name: "",
        birthday: "",
        gender: "",
        pic: null,
      }}
      onSubmit={submitProfile}
    >
      <div>
        <InputField name="name" type="text" placeholder="Name" />
        <InputField name="birthday" type="date" />
      </div>
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
      <div></div>
    </FormikStepper>
  );
};

const FormikStepper = ({ children, ...props }) => {
  const childArr = React.Children.toArray(children);
  const [step, setStep] = useState(0);

  const isLastStep = () => {
    return step === childArr.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={inputSchemas[step]}
      onSubmit={async (values, helpers) => {
        console.log(values);
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((step) => step + 1);
        }
      }}
    >
      {({ setFieldValue, values, errors }) => (
        <Form
          autoComplete="off"
          className="flex flex-col h-screen w-60 ml-auto mr-auto justify-center items-center"
        >
          {isLastStep() ? (
            <FileInput
              setfieldvalue={setFieldValue}
              picval={values.pic}
              picerr={errors.pic}
            />
          ) : (
            childArr[step]
          )}
          {step > 0 ? (
            <button type="button" onClick={() => setStep((step) => step - 1)}>
              Back
            </button>
          ) : null}
          <button type="submit">{isLastStep() ? "Submit" : "Next"}</button>
        </Form>
      )}
    </Formik>
  );
};

const FileInput = ({ setfieldvalue, picval, picerr }) => {
  return (
    <>
      <input
        id="pic"
        name="pic"
        type="file"
        accept="image/png, image/jpeg, image/png"
        className={`${picerr ? "invalid-input " : "valid-input "}input`}
        onChange={(event) => {
          setfieldvalue("pic", event.currentTarget.files[0]);
        }}
      />
      {picerr && <p className="inp-err-mssg">{picerr}</p>}

      {picval && !picerr && <PreviewImage image={picval} />}
    </>
  );
};

export default MainForm;
