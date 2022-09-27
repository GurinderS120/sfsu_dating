import React, { useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { FormikErrors, ErrorMessage } from "formik";
import PreviewImage from "./PreviewImage";
import Compress from "browser-image-compression";

// Interface defining the types for the props we are accepting for FileInput
// component
interface FileInputValues {
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

// Since the file/image part of the form is more involving and complex then
// the other parts we create a separate component for it
const FileInput = ({
  setFieldValue,
  picVal,
  picErr,
  orgImg,
  setOrgImg,
}: FileInputValues) => {
  const [modalOn, setModalOn] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // This function is responsible for compressing and converting file into
  // base64 encoded string which can be used as a url in src attribute of
  // an image html tag
  const handleFileChange = async (file: File) => {
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      const options = {
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedImage = await Compress(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedImage);

      reader.onload = (e) => {
        if (e?.target?.result) {
          setFieldValue("pic", { url: e.target.result, type: file.type });
          setOrgImg({ url: e.target.result, type: file.type });
          setModalOn(true);
        }
      };
    } else {
      setFieldValue("pic", { url: "", type: "" });
    }
  };

  const handleAddImage = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <h3 className="form-step-header">Profile Pic</h3>
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
            if (event?.currentTarget?.files?.[0]) {
              handleFileChange(event.currentTarget.files[0]);
            }
          }}
        />

        <div className="flex flex-row justify-between">
          <button
            className="image-upload-edit-btn"
            type="button"
            onClick={handleAddImage}
          >
            <AiOutlinePlus className="text-white" />
          </button>

          {!picErr && picVal.url && (
            <button
              className="image-upload-edit-btn"
              type="button"
              onClick={() => setModalOn(true)}
            >
              <FiEdit2 className="text-white" />
            </button>
          )}
        </div>

        <ErrorMessage name="pic" component="p" className="inp-err-mssg mb-2" />

        {!picErr && picVal.url && (
          <div className="image-section">
            <img src={picVal.url.toString()} alt="profile pic" />
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
    </>
  );
};

export default FileInput;
