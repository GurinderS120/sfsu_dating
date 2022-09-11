import { useState } from "react";
import Name from "./Name";
import Gender from "./Gender";
import Birthday from "./Birthday";
import Connect from "./Connect";
import ProfilePic from "./ProfilePic";

const MainForm = () => {
  const [step, setStep] = useState(0);
  const formTitles = ["Name", "Birthday", "Gender", "Connect", "Profile Pic"];
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");

  const toggleForms = (step) => {
    switch (step) {
      case 0:
        return <Name setName={setName} />;
      case 1:
        return <Birthday setBirthday={setBirthday} />;
      case 2:
        return <Gender />;
      case 3:
        return <Connect />;
      default:
        return <ProfilePic />;
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {/* Progress Bar */}
      <div></div>
      {/* Form container */}
      <div>
        {/* Header */}
        <div className="font-medium leading-tight text-5xl mt-0 mb-2 text-black">
          {formTitles[step]}
          {name}
        </div>
        {/* Body */}
        <div>{toggleForms(step)}</div>
        {/* Footer */}
        <div>
          <button
            disabled={step === 0}
            className="btn inline mr-3 disabled:opacity-40"
            onClick={() => setStep((currStep) => currStep - 1)}
          >
            Prev
          </button>
          <button
            disabled={step === formTitles.length - 1}
            className="btn inline disabled:opacity-40"
            onClick={() => setStep((currStep) => currStep + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
