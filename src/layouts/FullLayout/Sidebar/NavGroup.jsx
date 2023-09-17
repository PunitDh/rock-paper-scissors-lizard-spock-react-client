import React from "react";
import { ListSubheader, styled } from "@mui/material";
import NavItem from "./NavItem";

const ListSubheaderStyle = styled((props) => (
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
    {navItems.map((navItem) => (
      <NavItem
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
