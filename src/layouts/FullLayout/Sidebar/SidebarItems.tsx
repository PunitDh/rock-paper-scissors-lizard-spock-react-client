import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Box, List } from "@mui/material";
import NavGroup from "./NavGroup";
import NavGroupHeader from "./NavGroupHeader";

type Props = {
  closeSideBar?: () => void;
};

const SidebarItems = ({ closeSideBar }: Props) => {
  const { pathname } = useLocation();
  const menuItems = useSelector((state: any) => state.menu);
  const navGroups = Object.keys(menuItems);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }}>
        {navGroups.map((group) => (
          <div key={group}>
            <NavGroupHeader
              groupName={group}
              maximized={menuItems[group].maximized}
            />
            {menuItems[group].maximized && (
              <NavGroup
                navItems={menuItems[group]}
                pathDirect={pathname}
                closeSideBar={closeSideBar}
              />
            )}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default SidebarItems;
