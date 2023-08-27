import { useEffect } from "react";
import { useAPI } from "src/hooks";

const Logout = () => {
  const api = useAPI();
  useEffect(() => {
    api.logoutPlayer();
  }, []);

  return <></>;
};

export default Logout;
