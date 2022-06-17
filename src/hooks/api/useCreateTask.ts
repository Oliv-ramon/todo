import useAsync from "../useAsync";
import api, { CreateTaskData } from "../../services/api";
import useAuth from "../useAuth";

export default function useCreateTask() {
  const { auth } = useAuth();

  const {
    act: createTask,
    loading: createTaskLoading,
    error: createTaskError,
  } = useAsync(
    (data: CreateTaskData) => api.createTask(data, auth?.token as string),
    false
  );

  return {
    createTask,
    createTaskLoading,
    createTaskError,
  };
}
