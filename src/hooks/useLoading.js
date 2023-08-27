import { useEffect, useState } from "react";

export default function useLoading(action) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const actionFunction = (...args) => {
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };

  return [actionFunction, loading];
}
