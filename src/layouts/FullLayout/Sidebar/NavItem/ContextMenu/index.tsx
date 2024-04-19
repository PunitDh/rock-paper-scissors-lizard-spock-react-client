import { Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { IconMail, IconUser } from "@tabler/icons-react";
import { setAnchorEl, showConfirmDelete, showConfirmRename } from "../actions";
import { Action, State } from "../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  ariaLabelledBy: string;
};

const ContextMenu = ({
  state,
  dispatch,
  ariaLabelledBy,
}: Props): JSX.Element => (
  <Box>
    <Menu
      id="context-menu"
      keepMounted
      open={Boolean(state.anchorEl)}
      onClose={() => dispatch(setAnchorEl(null))}
      anchorEl={state.anchorEl}
      MenuListProps={{ "aria-labelledby": ariaLabelledBy }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        "& .MuiMenu-paper": {
          width: "200px",
        },
      }}
    >
      <MenuItem onClick={() => dispatch(showConfirmRename(true))}>
        <ListItemIcon>
          <IconUser width={20} />
        </ListItemIcon>
        <ListItemText>Rename Game</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => dispatch(showConfirmDelete(true))}>
        <ListItemIcon>
          <IconMail width={20} />
        </ListItemIcon>
        <ListItemText>Delete Game</ListItemText>
      </MenuItem>
    </Menu>
  </Box>
);

export default ContextMenu;
