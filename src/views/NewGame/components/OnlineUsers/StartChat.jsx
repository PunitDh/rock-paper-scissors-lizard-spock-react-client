import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { Chat } from "@mui/icons-material";
import { useToken } from "src/hooks";
import { useConversation } from "src/hooks";

const GameButton = styled(Chat)(({ theme }) => ({
  backgroundColor: "primary.main",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));

export default function StartChat({ user }) {
  const conversation = useConversation();
  const token = useToken();

  const handleStartChat = () => {
    const payload = {
      players: [token.decoded.id, user.id],
    };
    conversation.start(payload);
  };

  return (
    <Tooltip title={`Chat with ${user.firstName}`}>
      <GameButton onClick={handleStartChat} />
    </Tooltip>
  );
}
