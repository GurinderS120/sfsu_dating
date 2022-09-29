import { getStorage, ref, uploadString } from "firebase/storage";
import HandleError from "../../ErrorHandling";
import { uploadImageToCloudValues } from "./Interfaces";
import { app } from "../../firebase_config";

const uploadImageToCloudStorage = async (pic: uploadImageToCloudValues) => {
  const metaData = {
    contentType: pic.type,
  };

  const storage = getStorage(app);
  const storageRef = ref(storage, pic.storageRef);

  try {
    await uploadString(storageRef, pic.url.toString(), "data_url", metaData);
  } catch (error) {
    HandleError(error);
  }
};

export default uploadImageToCloudStorage;
