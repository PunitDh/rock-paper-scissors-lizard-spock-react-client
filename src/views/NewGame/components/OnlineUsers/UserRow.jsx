import { Avatar, TableRow, Tooltip, Typography } from "@mui/material";
import ResponsiveTableCell from "src/components/shared/ResponsiveTableCell";
import StyledTableCell from "src/components/shared/StyledTableCell";
import StartGameButton from "./StartGameButton";
import styled from "@emotion/styled";
import { blink } from "./styles";
import { avatars } from "src/data";
import { FlexBox } from "src/components/shared/styles";
import { useToken } from "src/hooks";

const OnlineIcon = styled.div(({ online }) => ({
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

const UserRow = ({ user }) => {
  const token = useToken();
  const onlineIconTitle = `${user.firstName} is ${
    user.isOnline ? "online" : "offline"
  }`;

  const startConversation = () => {
    console.log(user.id)
  }

  return (
    (!user.hidden || token.decoded.isAdmin) && (
      <TableRow>
        <StyledTableCell>
          <NameBox gap="0.5rem" alignItems="center" justifyContent="flex-start">
            <Tooltip title={`Start conversation with ${user.firstName}`}>
            <SmallAvatar onClick={startConversation} src={avatars[user.avatar]?.image || ""} />
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
          <StartGameButton user={user} />
        </StyledTableCell>
        <ResponsiveTableCell align="right">
          <Typography variant="h6">
            {(user.losses > 0 ? user.wins / user.losses : 0).toFixed(4)}
          </Typography>
        </ResponsiveTableCell>
      </TableRow>
    )
  );
};

export default UserRow;
