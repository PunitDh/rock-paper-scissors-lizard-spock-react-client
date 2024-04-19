import NavItem from "./NavItem";
import { NavItemType } from "./types";
import { useToken } from "../../../hooks";
import { NavGroupType } from "../../../redux/types";

type Props = {
  navItems: NavGroupType;
  pathDirect: string;
  closeSideBar?: () => void;
};

const NavGroup = ({ navItems, pathDirect, closeSideBar }: Props) => {
  const token = useToken();

  return (
    <>
      {navItems.items
        .filter(
          (navItem: NavItemType) =>
            !navItem.restricted || token.decoded?.isAdmin
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
