import { Form, Formik } from "formik";
import React, { useState } from "react";
import { FormikStepperProps } from "./Interfaces";
import FileInput from "./FileInput";
import {
  genderSchema,
  nameSchema,
  birthdaySchema,
  interestSchema,
  relationSchema,
  activitiesSchema,
  picSchema,
} from "../../Schemas/index";

const inputSchemas = [
  nameSchema,
  birthdaySchema,
  genderSchema,
  interestSchema,
  relationSchema,
  activitiesSchema,
  picSchema,
];

// This function is responsible for returning different css class representing
// corresponding form progress
const getProgress = (step: number) => {
  switch (step) {
    case 0:
      return "progress-bar-0";
    case 1:
      return "progress-bar-1";
    case 2:
      return "progress-bar-2";
    case 3:
      return "progress-bar-3";
    case 4:
      return "progress-bar-4";
    case 5:
      return "progress-bar-5";
    default:
      return "progress-bar-6";
  }
};

// FormikStepper will be passed all the different parts/steps of the multi-step
// form in the children prop
const FormikStepper = ({ children, ...props }: FormikStepperProps) => {
  const childArr = React.Children.toArray(children);
  const [orgImg, setOrgImg] = useState<{
    url: string | ArrayBuffer;
    type: string;
  } | null>({ url: "", type: "" });
  const [step, setStep] = useState(0);

  const isLastStep = () => {
    return step === childArr.length - 1;
  };

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={inputSchemas[step]}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          props.onSubmit(values, helpers);
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
            className="flex flex-col h-screen w-60 ml-auto mr-auto mt-[14rem] lg:form-container"
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
