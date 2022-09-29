import { useField, FieldHookConfig } from "formik";
import React from "react";

const CheckBoxField = (props: FieldHookConfig<string>) => {
  const [field] = useField(props);
  const { name, type } = props;

  return (
    <label className="flex flex-row justify-between mb-2 max-w-[15rem] lg:max-w-[16rem]">
      {props.value}
      <input className="w-3 ml-16" {...field} name={name} type={type} />
    </label>
  );
};

export default CheckBoxField;
