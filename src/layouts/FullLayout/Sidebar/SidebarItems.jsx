import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Box, List } from "@mui/material";
import NavGroup from "./NavGroup";
import { useToken } from "../../../hooks";

const SidebarItems = ({ closeSideBar }) => {
  const { pathname } = useLocation();
  const menuItems = useSelector((state) => state.menu);
  const token = useToken();
  const navGroups = Object.keys(menuItems);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }}>
        {navGroups.map((group) => (
          <NavGroup
            groupName={group}
            key={group}
            navItems={menuItems[group].filter(
              (navItem) => !navItem.restricted || token.decoded.isAdmin
            )}
            pathDirect={pathname}
            closeSideBar={closeSideBar}
          />
        ))}
      </List>
    </Box>
  );
};

export default SidebarItems;
