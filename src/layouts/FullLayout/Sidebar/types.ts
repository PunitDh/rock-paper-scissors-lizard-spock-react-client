import { TablerIconsProps } from "@tabler/icons-react";
import { NavItemAction } from "./NavItem/actions";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export type State = {
  anchorEl: HTMLElement | null;
  confirmRename: boolean;
  confirmDelete: boolean;
};

export type Action = {
  type: NavItemAction;
  payload?: any;
};

export type ProjectIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string })
  | ((props: TablerIconsProps) => Element)
  | ((props: TablerIconsProps) => JSX.Element);

export type NavItemType = {
  id: string;
  title: string;
  icon: ProjectIcon;
  href?: string;
  restricted?: boolean;
  players?: { [key: string]: any }[];
  onClick?: (...args: any[]) => any;
  gameContext?: boolean;
  movePlayed?: boolean;
};
