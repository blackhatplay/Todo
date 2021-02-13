import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  ADD_PROJECT,
  SELECTED_PROJECT,
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  SELECTED_TASK,
  RE_ORDER_PROJECTS,
  PROJECT_ORDER_ID,
  TASK_ORDER_ID,
  PROJECTS,
  TASKS,
  RE_ORDER_TASKS,
} from "../types";

import jsonServer from "../components/api/jsonServer";

export const fetchProjects = (userId) => {
  return async (dispatch) => {
    const res = await jsonServer.get(
      `/projects?userId=${userId}&_sort=order&_order=asc`
    );
    dispatch({
      type: FETCH_PROJECTS,
      payload: res.data,
    });
    if (res.data.length > 0) {
      dispatch(setProjectOrderId(res.data[res.data.length - 1].order));
    } else {
      dispatch(setProjectOrderId(0));
    }
  };
};

export const fetchTasks = (userId, postId) => {
  return async (dispatch) => {
    const res = await jsonServer.get(
      `/tasks?userId=${userId}&postId=${postId}&_sort=order&_order=asc`
    );
    dispatch({
      type: FETCH_TASKS,
      payload: res.data,
    });
    if (res.data.length > 0) {
      dispatch(setTaskOrderId(res.data[res.data.length - 1].order));
    } else {
      dispatch(setTaskOrderId(0));
    }
  };
};

export const deleteProject = (userId, projectId) => {
  return async (dispatch) => {
    try {
      const res = jsonServer.delete(`/projects/${projectId}`);
    } catch (e) {
      console.error(e.response.status);
    }
    try {
      const tasks = await jsonServer.get(
        `/tasks?userId=${userId}&postId=${projectId}`
      );
      const ids = tasks.data.reduce((acc, value) => {
        return (acc = `${value.id},${acc}`);
      }, "");
      if (ids) {
        const res = jsonServer.delete(`/tasks/${ids}`);
      }
    } catch (e) {
      console.error(e.response.status);
    }
    dispatch(setSelectedProject({}));
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId,
    });
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    const res = await jsonServer.delete(`/tasks/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  };
};

export const addProject = (data) => {
  return async (dispatch) => {
    const res = await jsonServer.post(`/projects`, data);
    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });
    dispatch(setProjectOrderId(data.order));
  };
};

export const updateProjects = (data) => {
  return {
    type: updateProjects,
    payload: data,
  };
};

export const addTask = (data) => {
  return async (dispatch) => {
    const res = await jsonServer.post(`/tasks`, data);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
    dispatch(setTaskOrderId(data.order));
  };
};

export const setSelectedProject = (data) => {
  return {
    type: SELECTED_PROJECT,
    payload: data,
  };
};

export const setSelectedTask = (id) => {
  return async (dispatch) => {
    const res = await jsonServer.get(`/tasks?postId=${id}`);
    dispatch({
      type: SELECTED_TASK,
      payload: res.data,
    });
  };
};

export const reOrder = (itemOne, itemTwo, to) => {
  if (to === PROJECTS) {
    return async (dispatch) => {
      dispatch({
        type: RE_ORDER_PROJECTS,
        payload: [itemTwo.order, itemOne.order],
      });
      jsonServer.patch(`/projects/${itemOne.id}`, {
        order: +itemOne.order,
      });
      jsonServer.patch(`/projects/${itemTwo.id}`, {
        order: +itemTwo.order,
      });
    };
  } else if (to === TASKS) {
    return async (dispatch) => {
      dispatch({
        type: RE_ORDER_TASKS,
        payload: [itemTwo.order, itemOne.order],
      });
      jsonServer.patch(`/tasks/${itemOne.id}`, {
        order: +itemOne.order,
      });
      jsonServer.patch(`/tasks/${itemTwo.id}`, {
        order: +itemTwo.order,
      });
    };
  }
};

export const setProjectOrderId = (id) => {
  return {
    type: PROJECT_ORDER_ID,
    payload: id,
  };
};
export const setTaskOrderId = (id) => {
  return {
    type: TASK_ORDER_ID,
    payload: id,
  };
};
