import React from "react";
import { ErrorMessage, FormikHelpers } from "formik";
import RadioField from "../FormikComponents/RadioField";
import InputField from "../FormikComponents/InputField";
import FormikStepper from "./FormikStepper";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import HandleError from "../../ErrorHandling";
import uploadImageToCloudStorage from "./UploadImageToCloud";
import { app } from "../../firebase_config";

// Create an interface of values that we will be using in our userprofile form
export interface Values {
  name: string;
  birthday: string;
  gender: string;
  interest: string;
  pic: { url: string | ArrayBuffer; type: string };
}

// Create an interface of values that we will be accepting as params to the uploadProfileToDatabase function
interface uploadProfileValues {
  values: Values;
  user: User | null;
  imgStrgRef: string;
}

// This function is responsible for connecting with Firebase's Realtime Database
// and submitting userprofile
const uploadProfileToDatabase = async (profInfo: uploadProfileValues) => {
  const { values, user, imgStrgRef } = profInfo;
  const db = getDatabase(app);

  try {
    await set(ref(db, `users/${user?.uid}/userprofile`), {
      name: values.name,
      birthday: values.birthday,
      gender: values.gender,
      interest: values.interest,
      pic: {
        url: imgStrgRef,
      },
    });
  } catch (error) {
    HandleError(error);
  }
};

// This function is responsible for calling helper functions to submit
// userprofile
const submitProfile = (values: Values, action: FormikHelpers<Values>) => {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const imgStrgRef = `users/${
        user.uid
      }/userprofile/profileImg.${values.pic.type.replace("image/", "")}`;

      uploadImageToCloudStorage({
        url: values.pic.url,
        type: values.pic.type,
        storageRef: imgStrgRef,
      });

      uploadProfileToDatabase({ values, user, imgStrgRef });
    } else {
      alert("No user is signed in");
    }
  });
};

// MainForm contains all the parts of the userProfile form, but we don't
// display them all at once. Instead we use the FormikStepper custom component
// to display each part separately like a multi-step form.
const MainForm = () => (
  <FormikStepper
    initialValues={{
      name: "",
      birthday: "",
      gender: "",
      interest: "",
      pic: { url: "", type: "" },
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

export default MainForm;
