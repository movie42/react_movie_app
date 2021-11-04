import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    ...action,
  };
}

export const useInputs = (initialData) => {
  const [state, dispatch] = useReducer(reducer, initialData);
  const handleData = (data) => {
    dispatch(data);
  };
  return [state, handleData];
};
