import { SIGN_IN, SIGN_OUT } from "../types";

const initialProps = {
  isSignedIn: null,
  userDetails: {},
};

export const authenticationReducer = (state = initialProps, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userDetails: action.payload,
      };
    case SIGN_OUT:
      return initialProps;
    default:
      return state;
  }
};
