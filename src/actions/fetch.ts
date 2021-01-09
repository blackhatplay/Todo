import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  ADD_PROJECT,
  SELECTED_PROJECT,
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  SELECTED_TASK,
} from "../types";
import jsonServer from "../components/api/jsonServer";

export const fetchProjects = (userId) => {
  return async (dispatch) => {
    const res = await jsonServer.get(`/projects?userId=${userId}`);
    dispatch({
      type: FETCH_PROJECTS,
      payload: res.data,
    });
  };
};

export const fetchTasks = (userId, postId) => {
  return async (dispatch) => {
    const res = await jsonServer.get(
      `/tasks?userId=${userId}&postId=${postId}`
    );
    dispatch({
      type: FETCH_TASKS,
      payload: res.data,
    });
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
  };
};

export const addTask = (data) => {
  return async (dispatch) => {
    const res = await jsonServer.post(`/tasks`, data);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
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
