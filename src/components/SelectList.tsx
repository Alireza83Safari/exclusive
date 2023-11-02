import React from "react";
import Select from "react-select";

export type selectListType = {
  defaultValue?:any;
  onChange: (selectedOption: any) => void;
  options: any;
  name: string;
};

export default function SelectList({
  defaultValue,
  onChange,
  options,
  name,
}: selectListType) {
  type CustomStyles = {
    control: (provided: any) => any;
    placeholder: (provided: any) => any;
  };

  const customStyles: CustomStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "13px",
    }),
  };

  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      value={defaultValue}
      onChange={onChange}
      options={options}
      styles={customStyles}
    />
  );
}
