import { Outlet } from "react-router-dom";
import Notification from "src/components/shared/Notification";
import { useNotification } from "src/hooks";

const BlankLayout = () => {
  const notification = useNotification();
  return (
    <>
      <Notification notification={notification} />
      <Outlet />
    </>
  );
};

export default BlankLayout;
