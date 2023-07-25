import React from "react";
import Menuitems from "./MenuItems";
import { useLocation } from "react-router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import ContextNavItem from "./ContextNavItem";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) =>
          item.subheader ? (
            <NavGroup item={item} key={item.subheader} />
          ) : item.gameContext ? (
            <ContextNavItem item={item} key={item.id} pathDirect={pathDirect} />
          ) : (
            <NavItem item={item} key={item.id} pathDirect={pathDirect} />
          )
        )}
      </List>
    </Box>
  );
};
export default SidebarItems;
