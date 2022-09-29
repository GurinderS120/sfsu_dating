import { getStorage, ref, uploadString } from "firebase/storage";
import HandleError from "../../ErrorHandling";
import { app } from "../../firebase_config";

// Create a type of value that we will be accepting as parameters for uploadImageToCloudStorage
interface uploadImageToCloudValues {
  url: string | ArrayBuffer;
  type: string;
  storageRef: string;
}

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
