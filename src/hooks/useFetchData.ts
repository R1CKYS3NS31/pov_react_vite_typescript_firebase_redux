import { useState, useEffect } from "react";
import { useNotificationHandler } from "./useNotificationHandler";

interface FetchOptions {
  successMessage?: string;
  errorMessage?: string;
  notificationHandler?: ReturnType<typeof useNotificationHandler>;
}

export const useFetchData = <T,>(
  fetchFunction: ((options: any) => Promise<T>) | null,
  options: any = {},
  fetchOptions: FetchOptions = {},
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!fetchFunction);

  const internalHandler = useNotificationHandler();

  const optionsString = JSON.stringify(options);
  const { successMessage, errorMessage, notificationHandler } = fetchOptions;

  // Use the passed handler OR our internal own
  const handler = notificationHandler || internalHandler;
  const { notify, handleApiError } = handler;

  useEffect(() => {
    if (!fetchFunction) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const parsedOptions = JSON.parse(optionsString);
      try {
        const result = await fetchFunction(parsedOptions);
        setData(result);
        if (successMessage) {
          notify(successMessage, "success");
        }
      } catch (err: any) {
        setData(null);
        if (errorMessage) notify(errorMessage, "error");
        else handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    fetchFunction,
    optionsString,
    handleApiError,
    notify,
    successMessage,
    errorMessage,
  ]);

  return { data, loading, ...handler };
};
