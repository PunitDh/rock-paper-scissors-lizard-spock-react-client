import { ListSubheader, styled } from "@mui/material";
import NavItem from "./NavItem";
import { NavItemType } from "./types";
import FlexBox from "../../../components/shared/FlexBox";
import { ArrowDropDown, ArrowRight } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { toggleShowNavGroup } from "../../../redux/menuSlice";
import { useToken } from "../../../hooks";

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

const NavGroup = ({ groupName, navItems, pathDirect, closeSideBar }) => {
  const token = useToken();
  const dispatch = useDispatch();
  const handleMaximize = () => dispatch(toggleShowNavGroup(groupName));

  return (
    <>
      <ListSubheaderStyle>
        <FlexBox
          alignItems="center"
          justifyContent="flex-start"
          cursor="pointer"
          onClick={handleMaximize}
        >
          {groupName} {navItems.maximized ? <ArrowDropDown /> : <ArrowRight />}
        </FlexBox>
      </ListSubheaderStyle>
      {navItems.maximized &&
        navItems.items
          .filter(
            (navItem: NavItemType) =>
              !navItem.restricted || token.decoded?.isAdmin,
          )
          .map((navItem: NavItemType) => (
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
};

export default NavGroup;
