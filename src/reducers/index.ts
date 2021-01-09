import { authenticationReducer } from "./authenticationReducer";
import { selectedProject, selectedTask } from "./selected";
import { fetchProjects } from "./fetchReducer";
import { fetchTasks } from "./fetchReducer";
import { combineReducers } from "redux";

export default combineReducers({
  authStatus: authenticationReducer,
  projects: fetchProjects,
  selectedProject: selectedProject,
  selectedTask: selectedTask,
  tasks: fetchTasks,
});
