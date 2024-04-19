import { Avatar, TableRow, Tooltip, Typography } from "@mui/material";
import StartGame from "./StartGame";
import styled from "@emotion/styled";
import { blink } from "./styles";
import StartChat from "./StartChat";
import FlexBox from "../../../../../components/shared/FlexBox";
import { useToken } from "../../../../../hooks";
import { getAvatar } from "../../../../../assets";
import StyledTableCell from "../../../../../components/shared/StyledTableCell";
import ResponsiveTableCell from "../../../../../components/shared/ResponsiveTableCell";
import { PlayerType } from "../../../types";

type Props = {
  user: PlayerType;
};

const OnlineIcon = styled.div(({ online }: { online: boolean }) => ({
  backgroundColor: online ? "lightgreen" : "red",
  borderRadius: "0.5rem",
  width: "0.5rem",
  height: "0.5rem",
  animation: `${blink} ${Number(online)}s ease-in-out infinite`,
}));

const NameBox = styled(FlexBox)({
  textAlign: "inherit",
});

const SmallAvatar = styled(Avatar)({
  width: "30px",
  height: "30px",
  cursor: "pointer",
});

const UserRow = ({ user }: Props): React.ReactNode => {
  const token = useToken();
  const onlineIconTitle = `${user.firstName} is ${
    user.isOnline ? "online" : "offline"
  }`;

  return (
    (!user.hidden || token.decoded?.isAdmin) ? (
      <TableRow>
        <StyledTableCell>
          <NameBox gap="0.5rem" alignItems="center" justifyContent="flex-start">
            <Tooltip title={`Start conversation with ${user.firstName}`}>
              <SmallAvatar src={getAvatar(user.avatar)} />
            </Tooltip>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <Tooltip title={onlineIconTitle}>
              <OnlineIcon online={user.isOnline} />
            </Tooltip>
          </NameBox>
        </StyledTableCell>
        <StyledTableCell>
          <FlexBox alignItems="center" justifyContent="flex-start" gap="0.5rem">
            <StartGame user={user} />
            <StartChat user={user} />
          </FlexBox>
        </StyledTableCell>
        <ResponsiveTableCell align="right">
          <Typography variant="h6">
            {(user.losses > 0 ? user.wins / user.losses : 0).toFixed(4)}
          </Typography>
        </ResponsiveTableCell>
      </TableRow>
    ) : <></>
  );
};

export default UserRow;
