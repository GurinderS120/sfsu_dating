import React, { useState, useRef } from "react";
import { Form, Formik, useField, ErrorMessage } from "formik";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import {
  genderSchema,
  nameSchema,
  birthdaySchema,
  interestSchema,
  picSchema,
} from "../../Schemas/index.ts";
import PreviewImage from "./previewImage";
import Compress from "browser-image-compression";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebase_config.ts";

const inputSchemas = [
  nameSchema,
  birthdaySchema,
  genderSchema,
  interestSchema,
  picSchema,
];

// InputField and RadioField are custom components that use
// Formik's useField() which is a react hook that automatically
// connects inputs to Formik
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
    </>
  );
};

const RadioField = ({ ...props }) => {
  const [field] = useField(props);

  return (
    <label className="flex flex-row justify-between mb-2 w-[11rem]">
      {props.value}
      <input className="w-3 ml-16" {...field} {...props} />
    </label>
  );
};

// This function is responsible for connecting with Firebase backend and
// submitting userprofile
const submitProfile = (values, action) => {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const db = getDatabase(app);
      set(ref(db, `users/${user.uid}/userprofile`), {
        name: values.name,
        birthday: values.birthday,
        gender: values.gender,
        interest: values.interest,
        pic: values.pic,
      });
    } else {
      console.log("No user is signed in");
    }
  });
};

// MainForm contains all the parts of the userProfile form, but we don't
// display them all at once. Instead we use the FormikStepper custom component
// to display each part separately like a multi-step form.

const MainForm = () => {
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
        <ErrorMessage component="p" name="name" className="inp-err-mssg" />
      </div>
      <div>
        <h3 className="form-step-header">Birthday</h3>
        <InputField name="birthday" type="date" />
        <ErrorMessage component="p" name="birthday" className="inp-err-mssg" />
      </div>
      <div className="ml-4">
        <h3 className="form-step-header">Gender</h3>
        <RadioField name="gender" value="Female" type="radio" />
        <RadioField name="gender" value="Male" type="radio" />
        <RadioField name="gender" value="Non-binary" type="radio" />
        <ErrorMessage component="p" name="gender" className="inp-err-mssg" />
      </div>
      <div className="ml-4">
        <h3 className="form-step-header">Interested In</h3>
        <RadioField name="interest" value="Men" type="radio" />
        <RadioField name="interest" value="Women" type="radio" />
        <RadioField name="interest" value="Both" type="radio" />
        <ErrorMessage component="p" name="interest" className="inp-err-mssg" />
      </div>
      <div></div>
    </FormikStepper>
  );
};

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
              <>
                <h3 className="form-step-header">Profile Pic</h3>
                <FileInput
                  setFieldValue={setFieldValue}
                  picVal={values.pic}
                  picErr={errors.pic}
                  orgImg={orgImg}
                  setOrgImg={setOrgImg}
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

// Since the file/image part of the form is more involving and complex then
// the other parts we create a separate component for it
const FileInput = ({ setFieldValue, picVal, picErr, orgImg, setOrgImg }) => {
  const [modalOn, setModalOn] = useState(false);
  const fileRef = useRef(null);

  // This function is responsible for compressing and converting file into
  // base64 encoded string which can be used as a url in src attribute of
  // an image html tag
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
        setOrgImg({ url: e.target.result, type: file.type });
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

      <div className="flex flex-row justify-between">
        <button
          className="image-upload-edit-btn"
          type="button"
          onClick={() => fileRef.current.click()}
        >
          <AiOutlinePlus className="text-white" />
        </button>

        {!picErr && picVal && (
          <button
            className="image-upload-edit-btn"
            type="button"
            onClick={() => setModalOn(true)}
          >
            <FiEdit2 className="text-white" />
          </button>
        )}
      </div>

      {picErr && <p className="inp-err-mssg mb-2">{picErr}</p>}

      {!picErr && picVal && (
        <div className="image-section">
          <img src={picVal.url} alt="profile pic" />
        </div>
      )}

      {!picErr && orgImg && modalOn && (
        <PreviewImage
          setFieldValue={setFieldValue}
          img={orgImg}
          setModalOn={setModalOn}
        />
      )}
    </div>
  );
};

export default MainForm;
