import { SIGN_IN, SIGN_OUT } from "../types";
import { fetchProjects } from "../actions/fetch";

export const authenticationIn = (payload) => (dispatch) => {
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
