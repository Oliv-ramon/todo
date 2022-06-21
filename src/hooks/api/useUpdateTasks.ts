import useAsync from "../useAsync";
import api, { UpdateTaskData } from "../../services/api";
import useAuth from "../useAuth";

export default function useUpdateTasks() {
  const { auth } = useAuth();

  const { act: updateTask, loading: tasksUpdateTask } = useAsync(
    (taskId: number, updateTaskData: UpdateTaskData) =>
      api.updateTask(taskId, updateTaskData, auth?.token as string),
    false
  );

  return {
    updateTask,
    tasksUpdateTask,
  };
}
