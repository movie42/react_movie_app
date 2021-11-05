import React, { useState, useEffect } from "react";
import Input from "Components/Input";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    // 뭐가 문제인지 모르겠다...
    console.log(email, password);
  }

  function handleEmail(value) {
    setEmail(value);
    console.log(value);
  }

  function handlePassword(value) {
    setPassword(value);
  }

  function handleReset(e) {
    setEmail("");
    setPassword("");
    setState(state + 1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        key={state + "email"}
        type="email"
        placeholder="이메일"
        onChange={handleEmail}
      />
      <Input
        key={state + "password"}
        type="password"
        placeholder="비밀번호"
        onChange={handlePassword}
      />
      <button type="submit">가입</button>
      <button type="button" onClick={handleReset}>
        초기화
      </button>
    </form>
  );
};

export default Form;
