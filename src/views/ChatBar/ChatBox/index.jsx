import { Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { TextInput } from "./TextInput";
import { Close } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useToken } from "src/hooks";
import { MessageRight } from "./MessageRight";
import { MessageLeft } from "./MessageLeft";
import { getAvatar } from "src/assets";
import { useDispatch } from "react-redux";
import { setCurrentConversation } from "src/redux/conversationSlice";

const CloseButton = styled(Close)({
  cursor: "pointer",
  "&:hover": {
    color: "#777",
  },
});

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  userSelect: "none",
  color: "white",
  borderTopRightRadius: "0.5rem",
  borderTopLeftRadius: "0.5rem",
  cursor: "pointer",
}));

const StyledPaper = styled(Paper)(({ show, toolbarheight }) => ({
  width: "80vw",
  height: show ? "80vh" : toolbarheight,
  maxWidth: "300px",
  maxHeight: "500px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  zIndex: "99",
}));

const MessageBody = styled(Paper)({
  width: "calc( 100% - 20px )",
  margin: 10,
  overflowY: "scroll",
  height: "calc( 100% - 80px )",
});

function ChatBox({ open, conversation }) {
  const [show, setShow] = useState(open);
  const dispatch = useDispatch();
  const [toolbarHeight, setToolbarHeight] = useState();
  const toolbarRef = useRef();
  const scrollToBottomRef = useRef();
  const textfieldRef = useRef();
  const token = useToken();
  const receiver = conversation.players.find(
    (player) => player.id !== token.decoded.id
  );

  const closeChatBox = () => {
    dispatch(setCurrentConversation(null));
    setShow(false);
  };

  const maximize = () => {
    setShow((show) => !show);
  };

  useEffect(() => {
    if (toolbarRef.current) {
      setToolbarHeight(getComputedStyle(toolbarRef.current));
    }
  }, [show]);

  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView();
    textfieldRef.current?.focus();
  }, [conversation.messages?.length]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-AU", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Australia/Sydney",
    }).format(new Date(date));

  return (
    <StyledPaper show={show} toolbarheight={toolbarHeight?.height}>
      <ToolbarStyled ref={toolbarRef} id="chat-toolbar" onClick={maximize}>
        <Typography>Chat</Typography>
        <Tooltip title="Close chat">
          <CloseButton onClick={closeChatBox} />
        </Tooltip>
      </ToolbarStyled>
      <MessageBody>
        {conversation.messages.map((message) =>
          message.sender === token.decoded.id ? (
            <MessageRight
              message={message.content}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(token.decoded.avatar)}
              displayName={token.decoded.firstName}
              avatarDisp={true}
              key={message.id}
            />
          ) : (
            <MessageLeft
              message={message.content}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(receiver.avatar)}
              displayName={receiver.firstName}
              avatarDisp={true}
              key={message.id}
            />
          )
        )}
        <div ref={scrollToBottomRef} />
      </MessageBody>
      <TextInput
        conversationId={conversation.id}
        receiver={receiver.id}
        textfieldRef={textfieldRef}
        token={token}
      />
    </StyledPaper>
  );
}

export default ChatBox;
