import { useEffect } from "react";
import usePlayer from "src/hooks/usePlayer";

const Logout = () => {
  const player = usePlayer();

  useEffect(() => {
    player.logout();
  }, []);

  return <div></div>;
};

export default Logout;
