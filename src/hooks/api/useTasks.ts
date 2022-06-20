import useAsync from "../useAsync";
import api, { Task } from "../../services/api";
import useAuth from "../useAuth";

export default function useTasks() {
  const { auth } = useAuth();

  const {
    act: getTodayTasksByCategoryId,
    loading: tasksLoading,
    data: tasks,
  } = useAsync(
    (categoryId: number) =>
      api.getTodayTasksByCategoryId(categoryId, auth?.token as string),
    false
  );

  return {
    getTodayTasksByCategoryId,
    tasksLoading,
    tasks: tasks as unknown as Task[],
  };
}
