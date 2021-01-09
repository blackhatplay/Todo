import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  ADD_PROJECT,
  SELECTED_PROJECT,
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  SIGN_OUT,
  SIGN_IN,
} from "../types";
import _ from "lodash";
const initProps = {};

export const fetchProjects = (state = initProps, action) => {
  if (action.type === FETCH_PROJECTS) {
    return { ...state, ..._.mapKeys(action.payload, "id") };
  } else if (action.type === DELETE_PROJECT) {
    return _.omit(state, action.payload);
  } else if (action.type === ADD_PROJECT) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type === SIGN_OUT) {
    return initProps;
  } else {
    return state;
  }
};

export const fetchTasks = (state = {}, action) => {
  if (action.type === ADD_TASK) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type === FETCH_TASKS) {
    return { ..._.mapKeys(action.payload, "id") };
  } else if (action.type === DELETE_TASK) {
    return _.omit(state, action.payload);
  } else if (action.type === SIGN_OUT) {
    return {};
  } else return state;
};
