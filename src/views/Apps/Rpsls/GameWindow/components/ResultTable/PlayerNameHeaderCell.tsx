import styled from "@emotion/styled";
import { Avatar, TableCell, Typography } from "@mui/material";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { getAvatar } from "../../../../../../assets";
import { PlayerType } from "../../../../types";

const Score = styled(FlexBox)(({ theme }) => ({
  fontSize: "large",
  color: "white",
  backgroundColor: theme.palette.primary.dark,
  width: "2rem",
  height: "2rem",
  borderRadius: "1rem",
}));

type Props = {
  player: PlayerType;
  score: number;
};

const PlayerNameHeaderCell = ({ player, score }: Props): React.ReactNode => {
  if (!player) return null;
  const avatar = getAvatar(player.avatar);

  return (
    <TableCell>
      <Typography variant="subtitle2" fontWeight={600}>
        <FlexBox justifyContent="flex-start" gap="0.5rem">
          <FlexBox flexDirection="column">
            <Avatar src={avatar} />
            {player.firstName}
          </FlexBox>
          <FlexBox>
            <Score>{score}</Score>
          </FlexBox>
        </FlexBox>
      </Typography>
    </TableCell>
  );
};

export default PlayerNameHeaderCell;
