import React, { useEffect } from "react";
import { useAPI } from "../../hooks";

const Logout = (): JSX.Element => {
  const api = useAPI();

  useEffect(() => {
    api.logoutPlayer();
  }, []);

  return <></>;
};

export default Logout;
