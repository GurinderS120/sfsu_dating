import { Form, Formik } from "formik";
import React, { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FormikStepperProps } from "./Interfaces";
import ReviewInputsBeforeSubmission from "./ReviewInputsBeforeSubmission";
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
  const [displayInputs, setDisplayInputs] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const isLastStep = () => {
    return step === childArr.length - 1;
  };

  const decreaseStep = () => {
    setStep((step) => step - 1);
  };

  const handleDisplayInputs = () => {
    setDisplayInputs(true);
  };

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={inputSchemas[step]}
      onSubmit={(values, helpers) => {
        if (isLastStep()) {
          setIsFormComplete(true);
          setDisplayInputs(true);
        } else {
          if (displayInputs) {
            setDisplayInputs(false);
          }
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
          {isFormComplete && !isLastStep() && (
            <ReviewSectionInfo handleDisplayInputs={handleDisplayInputs} />
          )}
          <Form
            className={`flex flex-col h-screen w-60 ml-auto mr-auto ${
              isFormComplete && !isLastStep() ? "mt-[3rem]" : "mt-[11rem]"
            } mt-lg:form-container`}
          >
            {displayInputs && (
              <ReviewInputsBeforeSubmission
                onSubmit={props.onSubmit}
                values={values}
                setStep={setStep}
                setDisplayInputs={setDisplayInputs}
              />
            )}
            {isLastStep() && !displayInputs && (
              <FileInput
                setFieldValue={setFieldValue}
                picVal={values.pic}
                picErr={errors.pic}
                orgImg={orgImg}
                setOrgImg={setOrgImg}
              />
            )}
            {!isLastStep() && !displayInputs && childArr[step]}
            <NextSubmitBtn isLastStep={isLastStep} />
            {step > 0 ? <BackBtn decreaseStep={decreaseStep} /> : null}
          </Form>
        </>
      )}
    </Formik>
  );
};

const NextSubmitBtn = (prop: { isLastStep: () => boolean }) => (
  <button className="btn mt-4 w-full" type="submit">
    {prop.isLastStep() ? "Submit" : "Next"}
  </button>
);

const BackBtn = (prop: { decreaseStep: () => void }) => (
  <button className="btn mt-4 w-full" type="button" onClick={prop.decreaseStep}>
    Back
  </button>
);

const ReviewSectionInfo = (prop: { handleDisplayInputs: () => void }) => (
  <div
    className="mt-[9rem] max-w-[25rem] mx-auto flex bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-2 py-3 shadow-md"
    role="alert"
  >
    <HiOutlineInformationCircle className="stroke-teal-500 h-7 w-7 mr-4" />
    <p>
      Click
      <span
        onClick={prop.handleDisplayInputs}
        className="underline text-blue-600 hover:text-blue-800 mx-1 cursor-pointer"
      >
        here
      </span>
      to go back to the review section
    </p>
  </div>
);

export default FormikStepper;
