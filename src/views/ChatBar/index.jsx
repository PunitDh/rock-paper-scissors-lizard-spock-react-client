import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";

const Container = styled.div({
  position: "fixed",
  bottom: 0,
  right: "1rem",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  width: "100vw",
  height: "4rem",
  gap: "0.25rem",
});

const ChatBar = () => {
  // const { conversations } = useSelector((state) => state.conversation);

  const conversations = [
    {
      id: "1",
      messages: [
        {
          sender: {
            firstName: "test",
            avatar: 11,
          },
          message: "Hi",
          createdAt: new Date(),
        },
        {
          sender: {
            firstName: "test",
            avatar: 11,
          },
          message: "Hello",
          createdAt: new Date(),
        },
        {
          sender: { id: "64cb796996357d030d1b9311" },
          message: "Hi",
          createdAt: new Date(),
        },
        {
          sender: {
            firstName: "test",
            avatar: 11,
          },
          message: "Test",
          createdAt: new Date(),
        },
        {
          sender: {
            firstName: "test",
            avatar: 11,
            id: "64cb796996357d030d1b9311",
          },
          message: "Test",
          createdAt: new Date(),
        },
      ],
    },
  ];

  return (
    <Container>
      {conversations.map((conversation) => (
        <ChatBox key={conversation.id} conversation={conversation} />
      ))}
    </Container>
  );
};

export default ChatBar;
