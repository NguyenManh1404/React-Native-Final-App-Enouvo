import React, { createContext, useReducer } from 'react';

export const SignInContext = createContext();

export const SignInContextProvider = (props) => {
  const [signedIn, dispatchSignedIn] = useReducer(SignInReducer, {
    userToken: null,
  });

  return (
    <SignInContext.Provider value={{ signedIn, dispatchSignedIn }}>
      {props.children}
    </SignInContext.Provider>
  );
};
export const SignInReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SIGN_IN':
      return {
        userToken: action.payload.userToken,
      };
    default:
      return state;
  }
};
