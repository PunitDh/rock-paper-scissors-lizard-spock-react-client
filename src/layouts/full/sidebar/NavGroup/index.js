import { ListSubheader, styled } from "@mui/material";
import ContextNavItem from "./ContextNavItem";
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

const NavGroup = ({ groupName, navItems, pathDirect }) => (
  <>
    <ListSubheaderStyle>{groupName}</ListSubheaderStyle>
    {navItems.map((navItem) =>
      navItem.gameContext ? (
        <ContextNavItem
          item={navItem}
          key={navItem.id}
          pathDirect={pathDirect}
        />
      ) : (
        <NavItem
          onClick={navItem.onClick}
          item={navItem}
          key={navItem.id}
          pathDirect={pathDirect}
        />
      )
    )}
  </>
);

export default NavGroup;
