import React, { useState } from "react";
import { Form, Formik, useField } from "formik";
import {
  genderSchema,
  nameSchema,
  birthdaySchema,
  interestSchema,
  picSchema,
} from "../../Schemas/index";
import PreviewImage from "./previewImage";

const inputSchemas = [
  nameSchema,
  birthdaySchema,
  genderSchema,
  interestSchema,
  picSchema,
];

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
        <h3 className="form-step-header">Name</h3>
        <InputField name="name" type="text" placeholder="Name" />
      </div>
      <div>
        <h3 className="form-step-header">Birthday</h3>
        <InputField name="birthday" type="date" />
      </div>
      <div>
        <h3 className="form-step-header">Gender</h3>
        <label>
          Female
          <InputField name="gender" type="radio" value="female" />
        </label>
        <label>
          Male
          <InputField name="gender" type="radio" value="male" />
        </label>
        <label>
          Non-binary
          <InputField name="gender" type="radio" value="Non-binary" />
        </label>
      </div>
      <div>
        <h3 className="form-step-header">Interested In</h3>
        <label>
          Men
          <InputField name="interest" type="radio" value="men" />
        </label>
        <label>
          Women
          <InputField name="interest" type="radio" value="women" />
        </label>
        <label>
          Both
          <InputField name="interest" type="radio" value="both" />
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

  const getProgress = () => {
    switch (step) {
      case 0:
        return "progress-bar-0";
      case 1:
        return "progress-bar-1";
      case 2:
        return "progress-bar-2";
      case 3:
        return "progress-bar-3";
      default:
        return "progress-bar-4";
    }
  };

  return (
    <Formik
      {...props}
      validationSchema={inputSchemas[step]}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((step) => step + 1);
        }
      }}
    >
      {({ setFieldValue, values, errors }) => (
        <>
          <div className="progress-bar-bg">
            <div className={getProgress()}></div>
          </div>
          <Form
            autoComplete="off"
            className="flex flex-col h-screen w-60 ml-auto mr-auto mt-12 lg:form-container"
          >
            {isLastStep() ? (
              <>
                <h3 className="form-step-header">Profile Pic</h3>
                <FileInput
                  setfieldvalue={setFieldValue}
                  picval={values.pic}
                  picerr={errors.pic}
                />
              </>
            ) : (
              childArr[step]
            )}
            <button className="btn mt-4 w-full" type="submit">
              {isLastStep() ? "Submit" : "Next"}
            </button>
            {step > 0 ? (
              <button
                className="btn mt-4 w-full"
                type="button"
                onClick={() => setStep((step) => step - 1)}
              >
                Back
              </button>
            ) : null}
          </Form>
        </>
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
