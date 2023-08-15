import { useLocation } from "react-router";
import { Box, List } from "@mui/material";
import NavGroup from "./NavGroup";
import { useSelector } from "react-redux";
import { useToken } from "src/hooks";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const menuItems = useSelector((state) => state.menu);
  const token = useToken();

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Object.keys(menuItems).map((groupName) => {
          const navItems = menuItems[groupName].filter(
            (navItem) => !navItem.restricted || token.decoded.isAdmin
          );
          return (
            navItems.length > 0 && (
              <NavGroup
                groupName={groupName}
                key={groupName}
                navItems={navItems}
                pathDirect={pathDirect}
              />
            )
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
