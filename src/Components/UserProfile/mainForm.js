import React, { useState, useRef } from "react";
import { Form, Formik, useField } from "formik";
import { AiOutlinePlus } from "react-icons/ai";
import {
  genderSchema,
  nameSchema,
  birthdaySchema,
  interestSchema,
  picSchema,
} from "../../Schemas/index";
import PreviewImage from "./previewImage";
import Compress from "browser-image-compression";

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
        interest: "",
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
      <div className="ml-8">
        <h3 className="form-step-header">Gender</h3>
        <label className="flex flex-row mb-2">
          Female
          <InputField
            className="w-3 ml-16"
            name="gender"
            type="radio"
            value="female"
          />
        </label>
        <label className="flex flex-row mb-2">
          Male
          <InputField
            className="w-3 ml-20"
            name="gender"
            type="radio"
            value="male"
          />
        </label>
        <label className="flex flex-row mb-2">
          Non-binary
          <InputField
            className="w-3 ml-[2.1rem]"
            name="gender"
            type="radio"
            value="Non-binary"
          />
        </label>
      </div>
      <div className="ml-8">
        <h3 className="form-step-header">Interested In</h3>
        <label className="flex flex-row mb-2">
          Men
          <InputField
            className="w-3 ml-20"
            name="interest"
            type="radio"
            value="men"
          />
        </label>
        <label className="flex flex-row mb-2">
          Women
          <InputField
            className="w-3 ml-14"
            name="interest"
            type="radio"
            value="women"
          />
        </label>
        <label className="flex flex-row mb-2">
          Both
          <InputField
            className="w-3 ml-[4.9rem]"
            name="interest"
            type="radio"
            value="both"
          />
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
          <div className="progress-bar">
            <div className="progress-bar-bg">
              <div className={`progress-bar-fg ${getProgress()}`}></div>
            </div>
          </div>
          <Form
            autoComplete="off"
            className="flex flex-col h-screen w-60 ml-auto mr-auto mt-[8rem] lg:form-container"
          >
            {isLastStep() ? (
              <>
                <h3 className="form-step-header">Profile Pic</h3>
                <FileInput
                  setFieldValue={setFieldValue}
                  picVal={values.pic}
                  picErr={errors.pic}
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

const FileInput = ({ setFieldValue, picVal, picErr }) => {
  const [modalOn, setModalOn] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = async (file) => {
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      const options = {
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedImage = await Compress(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedImage);

      reader.onload = (e) => {
        setFieldValue("pic", { url: e.target.result, type: file.type });
      };
    }
  };

  return (
    <div className="image-container">
      <input
        ref={fileRef}
        id="pic"
        name="pic"
        type="file"
        accept="image/png, image/jpeg"
        className={`${
          picErr ? "invalid-input " : "valid-input "
        }input upload-file`}
        onChange={(event) => {
          if (event.currentTarget.files[0]) {
            setFieldValue("pic", event.currentTarget.files[0]);
            handleFileChange(event.currentTarget.files[0]);
            setModalOn(true);
          }
        }}
      />
      <button
        className="text-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-1 lg:p-2 mb-3 rounded-full"
        type="button"
        onClick={() => fileRef.current.click()}
      >
        <AiOutlinePlus className="text-white" />
      </button>
      {picErr && <p className="inp-err-mssg mb-2">{picErr}</p>}

      {!picErr && picVal && (
        <div className="image-section">
          <img src={picVal.url} alt="profile pic" />
        </div>
      )}

      {!picErr && picVal && modalOn && (
        <PreviewImage
          setFieldValue={setFieldValue}
          img={picVal}
          setModalOn={setModalOn}
        />
      )}
    </div>
  );
};

export default MainForm;
