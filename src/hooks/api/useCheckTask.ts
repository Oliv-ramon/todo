import useAsync from "../useAsync";
import api from "../../services/api";
import useAuth from "../useAuth";

export default function useCheckTask() {
  const { auth } = useAuth();

  const { act: check, loading: checkLoading } = useAsync(
    (eventId: number) => api.checkTask(eventId, auth?.token as string),
    false
  );

  return {
    check,
    checkLoading,
  };
}
