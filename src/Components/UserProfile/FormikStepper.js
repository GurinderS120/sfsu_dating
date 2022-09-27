import React, { useState } from "react";
import { Form, Formik } from "formik";
import FileInput from "./FileInput";
import {
  genderSchema,
  nameSchema,
  birthdaySchema,
  interestSchema,
  picSchema,
} from "../../Schemas/index.ts";

const inputSchemas = [
  nameSchema,
  birthdaySchema,
  genderSchema,
  interestSchema,
  picSchema,
];

// This function is responsible for returning different css class representing
// corresponding form progress
const getProgress = (step) => {
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

// FormikStepper will be passed all the different parts/steps of the multi-step
// form in the children prop
const FormikStepper = ({ children, ...props }) => {
  const childArr = React.Children.toArray(children);
  const [orgImg, setOrgImg] = useState(null);
  const [step, setStep] = useState(0);

  const isLastStep = () => {
    return step === childArr.length - 1;
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
          <div className="progress-bar">
            <div className="progress-bar-bg">
              <div className={`progress-bar-fg ${getProgress(step)}`}></div>
            </div>
          </div>
          <Form
            autoComplete="off"
            className="flex flex-col h-screen w-60 ml-auto mr-auto mt-[8rem] lg:form-container"
          >
            {isLastStep() ? (
              <FileInput
                setFieldValue={setFieldValue}
                picVal={values.pic}
                picErr={errors.pic}
                orgImg={orgImg}
                setOrgImg={setOrgImg}
              />
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

export default FormikStepper;
