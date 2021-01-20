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
  RE_ORDER_PROJECTS,
  PROJECT_ORDER_ID,
  UPDATE_PROJECTS,
  TASK_ORDER_ID,
  RE_ORDER_TASKS,
} from "../types";
import _ from "lodash";
const initProps = {};

export const fetchProjects = (state = initProps, action) => {
  if (action.type === FETCH_PROJECTS) {
    return { ...state, ..._.mapKeys(action.payload, "order") };
  } else if (action.type === DELETE_PROJECT) {
    return _.omit(state, action.payload);
  } else if (action.type === ADD_PROJECT) {
    return { ...state, [action.payload.id]: action.payload };
  }
  // else if (action.type === UPDATE_PROJECTS) {
  //   return { ...state, ...action.payload };
  // }
  else if (action.type === SIGN_OUT) {
    return initProps;
  } else if (action.type === RE_ORDER_PROJECTS) {
    return {
      ...state,
      [action.payload[0]]: {
        ...state[action.payload[1]],
        order: +[action.payload[0]],
      },
      [action.payload[1]]: {
        ...state[action.payload[0]],
        order: +[action.payload[1]],
      },
    };
  } else {
    return state;
  }
};

export const fetchTasks = (state = {}, action) => {
  if (action.type === ADD_TASK) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type === FETCH_TASKS) {
    return { ..._.mapKeys(action.payload, "order") };
  } else if (action.type === DELETE_TASK) {
    return _.omit(state, action.payload);
  } else if (action.type === SIGN_OUT) {
    return {};
  } else if (action.type === RE_ORDER_TASKS) {
    return {
      ...state,
      [action.payload[0]]: {
        ...state[action.payload[1]],
        order: +[action.payload[0]],
      },
      [action.payload[1]]: {
        ...state[action.payload[0]],
        order: +[action.payload[1]],
      },
    };
  } else return state;
};

export const lastProjectOrderId = (state = 0, action) => {
  if (action.type === PROJECT_ORDER_ID) {
    return action.payload;
  } else {
    return state;
  }
};
export const lastTaskOrderId = (state = 0, action) => {
  if (action.type === TASK_ORDER_ID) {
    return action.payload;
  } else {
    return state;
  }
};
