import React, { useRef, useEffect } from "react";

const Input = ({ type, value, placeholder, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default React.memo(Input);
