import { useRef, useState } from "react";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import FlexBox from "../../../../../../../components/shared/FlexBox";
import { ArrowDropDown } from "@mui/icons-material";
import { AutoCalculate } from "../constants";
import { capitalize } from "lodash";

type Props = {
  onClick: (e: React.MouseEvent, value: any) => any;
  title: string;
  isActive: boolean;
  Icon: any;
  children?: any;
};

const MenuButton = ({ onClick, title, isActive, Icon, children }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(ref.current);
  };

  const closeMenu = (e: React.MouseEvent) => {
    setAnchorEl(null);
  };

  const handleSelect = (e: React.MouseEvent, calc: AutoCalculate) => {
    onClick(e, calc);
    closeMenu(e);
  };

  return (
    <Tooltip title={anchorEl ? "" : title} disableInteractive>
      <span>
        <FieldButton ref={ref} type="button" isactive={isActive} width="3rem">
          <FlexBox width="100%" height="100%" padding="0" gap="0">
            <Icon
              sx={{ width: "1rem" }}
              onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                onClick(e, AutoCalculate.SUM)
              }
            />
            <ArrowDropDown
              sx={{ width: "1rem", height: "100%" }}
              onClick={openMenu}
            />
          </FlexBox>
        </FieldButton>
        {anchorEl && (
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
          >
            {Object.values(AutoCalculate).map((calc) => (
              <MenuItem
                value={calc}
                key={calc}
                onClick={(e) => handleSelect(e, calc)}
              >
                {capitalize(calc)}
              </MenuItem>
            ))}
          </Menu>
        )}
      </span>
    </Tooltip>
  );
};

export default MenuButton;
