import { useState } from "react";

export default function useLoading(action) {
  const [loading, setLoading] = useState(false);
  const actionFn = (...args) => {
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };
  return [actionFn, loading];
}
