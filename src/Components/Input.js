import React, { useEffect, useState } from "react";

const Input = ({ type, placeholder, onChange }) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
    onChange(value);
  }

  return (
    <>
      {console.log("render", placeholder)}
      <input placeholder={placeholder} value={value} onChange={handleChange} />
    </>
  );
};

export default Input;
