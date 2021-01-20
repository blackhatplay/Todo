import { authenticationReducer } from "./authenticationReducer";
import { selectedProject, selectedTask } from "./selected";
import {
  fetchProjects,
  fetchTasks,
  lastProjectOrderId,
  lastTaskOrderId,
} from "./fetchReducer";
import { combineReducers } from "redux";
import { setSelectedProject } from "../actions/fetch";

export default combineReducers({
  authStatus: authenticationReducer,
  projects: fetchProjects,
  selectedProject: selectedProject,
  selectedTask: selectedTask,
  tasks: fetchTasks,
  lastProjectOrderId: lastProjectOrderId,
  lastTaskOrderId: lastTaskOrderId,
});
