import useAsync from "../useAsync";
import api, { Task } from "../../services/api";
import useAuth from "../useAuth";
import { Dayjs } from "dayjs";

export default function useTasks() {
  const { auth } = useAuth();

  const {
    act: getTasks,
    loading: tasksLoading,
    data: tasks,
  } = useAsync(
    (date?: Dayjs, categoryId?: number) =>
      api.getTasks(auth?.token as string, date, categoryId),
    false
  );

  return {
    getTasks,
    tasksLoading,
    tasks: tasks as unknown as Task[],
  };
}
