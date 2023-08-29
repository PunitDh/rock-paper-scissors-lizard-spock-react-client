import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import { ConversationState, formatDate } from "./constants";
import { useMediaQuery } from "@mui/material";

const Container = styled.div({
  position: "fixed",
  bottom: 0,
  right: "1dvw",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  width: "100dvw",
  height: "4rem",
  gap: "0.25rem",
});

const ChatBar = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const limit = mdUp ? 4 : 1;
  const { conversations } = useSelector((state) => state.conversation);
  const openConversations = [...conversations].filter(
    (conversation) => conversation.status !== ConversationState.CLOSED
  );

  return (
    <Container>
      {openConversations.slice(-limit).map((conversation) => (
        <ChatBox key={conversation.id} conversation={conversation} />
      ))}
    </Container>
  );
};

export default ChatBar;
