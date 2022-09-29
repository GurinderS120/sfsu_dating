import { FormikHelpers, FormikErrors } from "formik";
import { User } from "firebase/auth";

// Create a type of value that we will be accepting as parameters for uploadImageToCloudStorage
export interface uploadImageToCloudValues {
  url: string | ArrayBuffer;
  type: string;
  storageRef: string;
}

// Create an interface of values that we will be using in our userprofile form
export interface Values {
  name: string;
  birthday: string;
  gender: string;
  interest: string;
  relation: "";
  activities: [];
  pic: { url: string | ArrayBuffer; type: string };
}

// Create an interface of values that we will be accepting as params to the uploadProfileToDatabase function
export interface uploadProfileValues {
  values: Values;
  user: User | null;
  imgStrgRef: string;
}

// Create an interface of values that we will be using for FormikStepper
export interface FormikStepperProps {
  initialValues: {
    name: string;
    birthday: string;
    gender: string;
    interest: string;
    relation: "";
    activities: [];
    pic: { url: string | ArrayBuffer; type: string };
  };
  onSubmit(values: Values, action: FormikHelpers<Values>): void;
  children: React.ReactNode;
}

// Interface defining the types for the props we are accepting for FileInput
// component
export interface FileInputValues {
  setFieldValue(
    field: string | ArrayBuffer,
    value: { url: string | ArrayBuffer; type: string },
    shouldValidate?: boolean | undefined
  ): void;
  picVal: { url: string | ArrayBuffer; type: string };
  picErr: FormikErrors<{ url: string | ArrayBuffer; type: string }> | undefined;
  orgImg: { url: string | ArrayBuffer; type: string } | null;
  setOrgImg: React.Dispatch<
    React.SetStateAction<{ url: string | ArrayBuffer; type: string } | null>
  >;
}

// Interface defining the types for the props we are accepting for PreviewImage
// component
export interface PreviewImageValues {
  img: { url: string | ArrayBuffer; type: string } | null;
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  setFieldValue(
    field: string | ArrayBuffer,
    value: { url: string | ArrayBuffer; type: string },
    shouldValidate?: boolean | undefined
  ): void;
}
