import React from "react";

export type InputPropsType = {
  className?: string;
  name: string;
  placeholder?: string;
  value: string | null | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  labelText?: string;
  Error?: string;
  callback?: () => void;
};
export default function Input({
  className,
  name,
  placeholder,
  value,
  onChange,
  type,
  labelText,
  Error,
  callback,
}: InputPropsType) {
  return (
    <>
      {labelText ? (
        <label htmlFor={name} className="block text-sm">
          {labelText}
        </label>
      ) : null}

      <input
        type={type && type.length > 1 ? type : "text"}
        placeholder={placeholder}
        name={name}
        className={` border-borderColor p-2 w-full rounded-lg outline-none focus:border-blue-600 placeholder:text-sm placeholder:text-black-900  ${className}`}
        value={value}
        onChange={onChange}
        onFocus={callback}
      />
      <p className="text-sm text-red">{Error}</p>
    </>
  );
}
