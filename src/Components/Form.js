import React, { useState } from "react";

const Form = () => {
  const [value, setValue] = useState({
    email: "",
    password: ""
  });

  const { email, password } = value;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("제출");
  }

  function handleEmail(e) {
    setValue({ ...value, email: e.target.value });
  }
  function handlePassword(e) {
    setValue({ ...value, password: e.target.value });
  }

  return (
    <>
      <from onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePassword}
        />
        <button></button>
      </from>
    </>
  );
};

export default Form;
