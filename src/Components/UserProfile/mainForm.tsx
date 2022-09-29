import React from "react";
import { ErrorMessage, FormikHelpers } from "formik";
import RadioField from "../FormikComponents/RadioField";
import InputField from "../FormikComponents/InputField";
import CheckBoxField from "../FormikComponents/CheckBoxField";
import { activitiesArr } from "./Data";
import FormikStepper from "./FormikStepper";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { uploadProfileValues, Values } from "./Interfaces";
import HandleError from "../../ErrorHandling";
import uploadImageToCloudStorage from "./UploadImageToCloud";
import { app } from "../../firebase_config";

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
      relation: values.relation,
      activities: values.activities,
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
      relation: "",
      activities: [],
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
    <div className="ml-4">
      <h3 className="form-step-header">Relationship</h3>
      <p className="text-xs md:text-sm mb-3 font-semibold">
        What kind of relationship are you looking for?
      </p>
      <RadioField name="relation" value="Serious" type="radio" />
      <RadioField name="relation" value="Casual" type="radio" />
      <RadioField name="relation" value="Friendship" type="radio" />
      <ErrorMessage component="p" name="relation" className="inp-err-mssg" />
    </div>
    <div className="ml-0">
      <h3 className="form-step-header">Activities</h3>
      <p className="text-xs md:text-sm mb-3 font-semibold">
        How do you like to spend your time?
      </p>
      {activitiesArr.map((activity, index) => (
        <CheckBoxField
          key={index}
          name="activities"
          value={activity}
          type="checkbox"
        />
      ))}
      <ErrorMessage component="p" name="activities" className="inp-err-mssg" />
    </div>
    <div></div>
  </FormikStepper>
);

export default MainForm;
