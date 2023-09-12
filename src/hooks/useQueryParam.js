import { useLocation } from "react-router";

export default function useQueryParam(key) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const responseTab = searchParams.get(key);
  return responseTab;
}
