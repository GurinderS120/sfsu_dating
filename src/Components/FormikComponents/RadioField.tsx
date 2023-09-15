import { useField, FieldHookConfig } from "formik";
import React from "react";

const RadioField = (props: FieldHookConfig<string>) => {
  const [field] = useField(props);
  const { name, type } = props;

  return (
    <label className="flex flex-row justify-between mb-2 w-[11rem]">
      {props.value}
      <input className="w-3 ml-16" {...field} name={name} type={type} />
    </label>
  );
};

export default RadioField;
