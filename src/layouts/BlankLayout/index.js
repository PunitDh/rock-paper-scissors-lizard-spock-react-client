import { Outlet } from "react-router-dom";
import { useNotification } from "../../hooks";
import Notification from "../../components/shared/Notification";

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
