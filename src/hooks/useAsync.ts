// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";

type Handler = (...args: any) => Promise<AxiosResponse<any, any>>;

export default function useAsync(handler: Handler, immediate: boolean = true) {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const act = async (...args: any) => {
    setLoading(true);
    setError(null);

    try {
      const { data: newData } = await handler(...args);
      setData(newData);
      setLoading(false);
      return newData;
    } catch (err: AxiosError | Error | any) {
      setError(err);
      setLoading(false);
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
