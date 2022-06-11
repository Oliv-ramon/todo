import useAsync from "../useAsync";
import api, { WeekDay } from "../../services/api";

export default function useWeekDays() {
  const { loading: weekDaysLoading, data: weekDays } = useAsync(
    api.getWeekDays,
    true
  );

  return {
    weekDaysLoading,
    weekDays: weekDays as unknown as WeekDay[],
  };
}
