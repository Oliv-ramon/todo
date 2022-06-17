import useAsync from "../useAsync";
import api, { Task } from "../../services/api";
import useAuth from "../useAuth";

export default function useTasks() {
  const { auth } = useAuth();

  const {
    act: getTasksByCategoryId,
    loading: tasksLoading,
    data: tasks,
  } = useAsync(
    (categoryId: number) =>
      api.getTasksByCategoryId(categoryId, auth?.token as string),
    false
  );

  return {
    getTasksByCategoryId,
    tasksLoading,
    tasks: tasks as unknown as Task[],
  };
}
