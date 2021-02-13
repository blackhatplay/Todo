import { SIGN_IN, SIGN_OUT } from "../types";
import { fetchProjects } from "../actions/fetch";
import Cookie from "js-cookie";

export const authenticationIn = (payload) => (dispatch) => {
  Cookie.set(
    "authStatus",
    JSON.stringify({
      isSignedIn: true,
      userDetails: payload,
    })
  );
  dispatch(fetchProjects(payload.userId));
  dispatch({
    type: SIGN_IN,
    payload,
  });
};

export const authenticationOut = () => {
  return {
    type: SIGN_OUT,
  };
};
