import { SELECTED_PROJECT, SELECTED_TASK, SIGN_OUT } from "../types";
import _ from "lodash";

export const selectedProject = (state = {}, action) => {
  if (action.type === SELECTED_PROJECT) {
    return action.payload;
  } else if (action.type === SIGN_OUT) {
    return {};
  } else return state;
};
export const selectedTask = (state = {}, action) => {
  if (action.type === SELECTED_TASK) {
    return { ..._.mapKeys(action.payload, "id") };
  } else return state;
};
