import React, { useEffect } from "react";
import { useAPI } from "../../hooks";

const Logout = (): React.ReactNode => {
  const api = useAPI();

  useEffect(() => {
    api.logoutPlayer();
  }, [api]);

  return <></>;
};

export default Logout;
