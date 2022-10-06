import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { DisplayPicValues, ReviewInputsValues } from "./Interfaces";

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
}: ReviewInputsValues) => (
  <div className="modal-container">
    <div className="modal-content-wrapper md:h-[40rem] max-w-[30rem] overflow-auto">
      <div className="modal-display-inputs">
        <h3 className="form-step-header mb-6 mt-16">Review</h3>
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
            <FiEdit2 className="mt-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DisplaySingleInput = (prop: { keyVal: string; value: string }) => (
  <p className="mb-3">
    <span className="font-bold mr-2">
      {prop.keyVal[0].toUpperCase() + prop.keyVal.slice(1)}:
    </span>
    <span>{prop.value}</span>
  </p>
);

const DisplayActivities = (prop: { activities: string[] }) => (
  <div className="mb-3">
    <h3 className="mb-1 font-bold">Activities:</h3>
    <div className="max-h-[8rem] overflow-auto">
      {prop.activities.map((activity: string, idx: number) => (
        <p key={idx}>{activity}</p>
      ))}
    </div>
  </div>
);

const DisplayPic = ({ value }: DisplayPicValues) => (
  <div className="mb-3">
    <h3 className="font-bold">Profile Pic:</h3>
    <img
      className="image-section mt-1"
      src={value.url.toString()}
      alt="profile pic"
    />
  </div>
);

export default ReviewInputsBeforeSubmission;
