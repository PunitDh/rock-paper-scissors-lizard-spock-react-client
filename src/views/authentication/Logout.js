import { useEffect } from "react";
import { usePlayer } from "src/hooks";

const Logout = () => {
  const player = usePlayer();

  useEffect(() => {
    player.logout();
  }, []);

  return <div></div>;
};

export default Logout;
