import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import { ConversationState } from "./constants";

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
  const { conversations } = useSelector((state) => state.conversation);

  return (
    <Container>
      {conversations.map(
        (conversation) =>
          conversation.state !== ConversationState.CLOSED && (
            <ChatBox key={conversation.id} conversation={conversation} />
          )
      )}
    </Container>
  );
};

export default ChatBar;
