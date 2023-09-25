import { Outlet } from "react-router-dom";
import { useNotification } from "../../hooks";
import NotificationComponent from "../../components/shared/Notification";

function BlankLayout() {
  const notification = useNotification();

  return (
    <>
      <NotificationComponent notification={notification} />
      <Outlet />
    </>
  );
}

export default BlankLayout;
