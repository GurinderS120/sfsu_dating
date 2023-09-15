import { getDatabase, ref, set } from "firebase/database";
import { uploadProfileValues } from "./Interfaces";
import { app } from "../../firebase_config";
import HandleError from "../../ErrorHandling";

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

export default uploadProfileToDatabase;
