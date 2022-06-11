import { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

type Handler = (...args: any) => Promise<AxiosResponse<any, any>>;

export default function useAsync(handler: Handler, immediate: boolean = true) {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const act = async (...args: any) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await handler(...args);
      setData(data);
      setLoading(false);
      return data;
    } catch (err: AxiosError | Error | any) {
      setError(err);
      setLoading(false);
      if (err.response.status === 401) logout();
      throw err;
    }
  };

  useEffect(() => {
    if (immediate) {
      act();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    act,
  };
}
