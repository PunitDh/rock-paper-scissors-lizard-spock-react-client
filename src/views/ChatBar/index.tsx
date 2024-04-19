import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import { ChatBoxStatus } from "./constants";
import { Theme, useMediaQuery } from "@mui/material";
import { Conversation } from "../../redux/types";

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

const ChatBar = (): React.ReactNode => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { conversations } = useSelector((state: any) => state.conversation);
  const limit = mdUp ? 4 : 1;

  const openConversations = [...conversations].filter(
    (conversation) => conversation.status !== ChatBoxStatus.CLOSED
  );

  return (
    <Container>
      {openConversations.slice(-limit).map((conversation: Conversation) => (
        <ChatBox key={conversation.id} conversation={conversation} />
      ))}
    </Container>
  );
};

export default ChatBar;
