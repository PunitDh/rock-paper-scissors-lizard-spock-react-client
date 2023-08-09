import { Avatar, TableRow, Typography } from "@mui/material";
import ResponsiveTableCell from "src/components/shared/ResponsiveTableCell";
import StyledTableCell from "src/components/shared/StyledTableCell";
import StartGameButton from "./StartGameButton";
import styled from "@emotion/styled";
import { blink } from "./styles";
import { avatars } from "src/data";
import { FlexBox } from "src/components/shared/styles";

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
});

const UserRow = ({ user }) => {
  const onlineIconTitle = `${user.firstName} is ${
    user.isOnline ? "online" : "offline"
  }`;

  return (
    <TableRow key={user.firstName + user.lastName}>
      <ResponsiveTableCell>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {user.id}
        </Typography>
      </ResponsiveTableCell>
      <StyledTableCell>
        <NameBox gap="0.5rem" alignItems="center" justifyContent="flex-start">
          <SmallAvatar src={avatars[user.avatar]?.image || ""} />
          <span>
            {user.firstName} {user.lastName}
          </span>
          <span title={onlineIconTitle}>
            <OnlineIcon online={user.isOnline} />
          </span>
        </NameBox>
      </StyledTableCell>
      <StyledTableCell>
        <StartGameButton user={user} />
      </StyledTableCell>
      <ResponsiveTableCell align="right">
        <Typography variant="h6">{user.wlRatio}</Typography>
      </ResponsiveTableCell>
    </TableRow>
  );
};

export default UserRow;
