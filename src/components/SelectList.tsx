import React from "react";
import Select from "react-select";

export type selectListType = {
  defaultValue: string;
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
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: "24px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "13px", // Adjust the font size as needed
    }),
  };

  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      styles={customStyles}
    />
  );
}
