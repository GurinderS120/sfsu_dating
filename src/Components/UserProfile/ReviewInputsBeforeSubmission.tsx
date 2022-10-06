import React from "react";
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
    <div className="modal-display-inputs-wrapper">
      <div className="modal-display-inputs">
        {Object.entries(values).map(([key, value], index) => (
          <div key={index}>
            {isSingleInput(key) ? (
              <DisplaySingleInput keyVal={key} value={value} />
            ) : key === "pic" ? (
              <DisplayPic value={value} />
            ) : (
              <DisplayActivities activities={value} />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DisplaySingleInput = (prop: { keyVal: string; value: string }) => (
  <p>
    {prop.keyVal[0].toUpperCase() + prop.keyVal.slice(1)}:{" "}
    <span>{prop.value}</span>
  </p>
);

const DisplayActivities = (prop: { activities: string[] }) => (
  <div>
    Activities:
    {prop.activities.map((activity: string, idx: number) => (
      <p key={idx}>{activity}</p>
    ))}
  </div>
);

const DisplayPic = ({ value }: DisplayPicValues) => (
  <img src={value.url.toString()} alt="profile pic" />
);

export default ReviewInputsBeforeSubmission;
