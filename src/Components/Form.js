import React, { useState, useMemo, useCallback } from "react";
import Input from "Components/Input";
import useInputState from "./useInputState";
import useWindowWidth from "./useWindowWidth";

let renderCount = 0;

function Form() {
  const [email, setEmail, handleEmail] = useInputState("");
  const [password, setPassword, handlePassword] = useInputState("");
  const windowWidth = useWindowWidth();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(email, password);
    },
    [email, password]
  );

  const handleReset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  console.log("render count", ++renderCount);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">가입</button>
        <button type="button" onClick={handleReset}>
          초기화
        </button>
      </form>
      <div>{windowWidth}</div>
    </>
  );
}

export default Form;
