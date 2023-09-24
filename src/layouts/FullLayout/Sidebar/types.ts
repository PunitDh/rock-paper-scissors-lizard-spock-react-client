import { IconDashboard } from "@tabler/icons-react";
import { NavItemAction } from "./NavItem/actions";

export type State = {
  anchorEl: HTMLElement | null;
  confirmRename: boolean;
  confirmDelete: boolean;
};

export type Action = {
  type: NavItemAction;
  payload?: any;
};

export type NavItemType = {
  id: string;
  title: string;
  icon: typeof IconDashboard;
  href: string;
  restricted?: boolean;
  onClick?: (...args: any[]) => any;
  gameContext?: boolean;
};
