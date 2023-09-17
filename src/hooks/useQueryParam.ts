import { useLocation } from "react-router";

export default function useQueryParam(key: string): string | null {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(key);
}
