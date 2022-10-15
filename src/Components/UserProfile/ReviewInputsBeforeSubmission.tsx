import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { DisplayPicValues, ReviewInputsValues } from "./Interfaces";
import { Navigate } from "react-router-dom";

const isSingleInput = (key: string) => {
  if (key === "pic" || key === "activities") {
    return false;
  }
  return true;
};

const ReviewInputsBeforeSubmission = ({
  onSubmit,
  values,
  setStep,
  setDisplayInputs,
}: ReviewInputsValues) => {
  const [isFormComplete, setIsFormComplete] = useState(false);

  return (
    <div className="modal-container">
      {isFormComplete && <Navigate to="/" />}
      <div className="modal-content-wrapper md:h-[45rem] max-w-[30rem] overflow-auto py-3">
        <div className="flex flex-col space-y-2">
          <h3 className="form-step-header mb-6 mt-10">Review</h3>
          {Object.entries(values).map(([key, value], index) => (
            <div
              key={index}
              className="flex flex-row w-60 lg:w-72 justify-between"
            >
              {isSingleInput(key) ? (
                <DisplaySingleInput keyVal={key} value={value} />
              ) : key === "pic" ? (
                <DisplayPic value={value} />
              ) : (
                <DisplayActivities activities={value} />
              )}
              <FiEdit2
                onClick={() => {
                  setStep(index);
                  setDisplayInputs(false);
                }}
                className="mt-1 cursor-pointer"
              />
            </div>
          ))}
          <button
            className="btn mt-4 w-full -translate-x-2"
            onClick={() => {
              onSubmit(values);
              setIsFormComplete(true);
            }}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const DisplaySingleInput = (prop: { keyVal: string; value: string }) => (
  <div>
    <span className="font-bold mr-2">
      {prop.keyVal[0].toUpperCase() + prop.keyVal.slice(1)}:
    </span>
    <span>{prop.value}</span>
  </div>
);

const DisplayActivities = (prop: { activities: string[] }) => (
  <div>
    <h3 className="mb-1 font-bold">Activities:</h3>
    <div className="max-h-[8rem] overflow-auto">
      {prop.activities.map((activity: string, idx: number) => (
        <p key={idx}>{activity}</p>
      ))}
    </div>
  </div>
);

const DisplayPic = ({ value }: DisplayPicValues) => (
  <div>
    <h3 className="font-bold">Profile Pic:</h3>
    <img
      className="image-section mt-1 object-cover"
      src={value.url.toString()}
      alt="profile pic"
    />
  </div>
);

export default ReviewInputsBeforeSubmission;
