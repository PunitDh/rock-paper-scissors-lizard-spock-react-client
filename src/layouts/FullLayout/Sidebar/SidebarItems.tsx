import { useLocation } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Box, List } from "@mui/material";
import NavGroup from "./NavGroup";

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
          <NavGroup
            key={group}
            groupName={group}
            navItems={menuItems[group]}
            pathDirect={pathname}
            closeSideBar={closeSideBar}
          />
        ))}
      </List>
    </Box>
  );
};

export default SidebarItems;
