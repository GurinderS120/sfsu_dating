import { useField, FieldHookConfig } from "formik";
import React from "react";

const InputField = (props: FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const { name, type, placeholder } = props;

  return (
    <>
      <input
        className={`${
          meta.touched && meta.error ? "invalid-input " : "valid-input "
        }input`}
        {...field}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputField;
