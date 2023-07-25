import React, { useEffect } from "react";
import { useAuth } from "src/hooks/useAuth";

const Logout = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
  }, []);

  return <div></div>;
};

export default Logout;
