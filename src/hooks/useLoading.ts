import { useEffect, useState } from "react";

export default function useLoading(
  action: (...args: any[]) => any
): [actionFunction: (...args: any[]) => any, loading: boolean] {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const actionFunction = (...args: any[]) => {
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };

  return [actionFunction, loading];
}
