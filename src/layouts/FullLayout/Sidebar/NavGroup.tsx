import React from "react";
import { ListSubheader, styled } from "@mui/material";
import NavItem from "./NavItem";
import { NavItemType } from "./types";

const ListSubheaderStyle = styled((props: any) => (
  <ListSubheader disableSticky {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  fontWeight: "700",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: theme.palette.text.primary,
  lineHeight: "26px",
  padding: "3px 12px",
}));

const NavGroup = ({ groupName, navItems, pathDirect, closeSideBar }) => (
  <>
    <ListSubheaderStyle>{groupName}</ListSubheaderStyle>
    {navItems.map((navItem: NavItemType) => (
      <NavItem
        level={0}
        item={navItem}
        key={navItem.id}
        pathDirect={pathDirect}
        closeSideBar={closeSideBar}
        onClick={navItem.onClick}
        hasContextMenu={navItem.gameContext}
      />
    ))}
  </>
);

export default NavGroup;
