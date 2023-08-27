import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";

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
  const { currentConversation } = useSelector((state) => state.conversation);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    setOpen(1);
  }, [currentConversation?.messages.length]);

  return (
    <Container>
      {currentConversation && (
        <ChatBox open={open} conversation={currentConversation} />
      )}
      {/* {conversations.map((conversation) => (
        <ChatBox key={conversation.id} conversation={conversation} />
      ))} */}
    </Container>
  );
};

export default ChatBar;
