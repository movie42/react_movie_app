import React, { useState, useMemo, useCallback } from "react";
import Input from "Components/Input";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const handlePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, password);
    },
    [email, password],
  );

  const handleReset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const emailAccessory = useMemo(() => {
    return email !== "" && <button>X</button>;
  }, [email]);

  const passwordAccessory = useMemo(() => {
    return password !== "" && <button>X</button>;
  }, [password]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={handleEmail}
        accessory={emailAccessory}
        autoFocus={true}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePassword}
        accessory={passwordAccessory}
      />
      <button type="submit">가입</button>
      <button type="button" onClick={handleReset}>
        초기화
      </button>
    </form>
  );
}

export default Form;
