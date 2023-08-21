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

const StyledPaper = styled(Paper)(({ maximized, toolbarheight }) => ({
  width: "80vw",
  height: maximized > 0 ? "80dvh" : toolbarheight,
  maxWidth: "300px",
  maxHeight: "500px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  boxShadow: "-1rem -1rem 3rem -1rem rgba(0,0,0,0.7)",
  borderTopRightRadius: "0.5rem",
  borderTopLeftRadius: "0.5rem",
}));

const MessageBody = styled(Paper)({
  width: "calc( 100% - 20px )",
  margin: 10,
  overflowY: "scroll",
  height: "calc( 100% - 80px )",
});

function ChatBox({ open, conversation }) {
  const [maximized, setMaximized] = useState(open);
  const dispatch = useDispatch();
  const [toolbarHeight, setToolbarHeight] = useState();
  const toolbarRef = useRef();
  const scrollToBottomRef = useRef();
  const token = useToken();
  const receiver = conversation.players.find(
    (player) => player.id !== token.decoded.id
  );

  const closeChatBox = () => {
    dispatch(setCurrentConversation(null));
    setMaximized(0);
  };

  const maximize = () => setMaximized((maximized) => Math.abs(maximized - 1));

  useEffect(() => {
    if (toolbarRef.current) {
      setToolbarHeight(getComputedStyle(toolbarRef.current));
    }
  }, [maximized]);

  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView();
    setMaximized(1);
  }, [conversation.messages?.length]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-AU", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Australia/Sydney",
    }).format(new Date(date));

  return (
    <StyledPaper maximized={maximized} toolbarheight={toolbarHeight?.height}>
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
              key={message._id}
              content={message.content}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(token.decoded.avatar)}
              displayName={token.decoded.firstName}
              avatarDisp={true}
            />
          ) : (
            <MessageLeft
              key={message._id}
              content={message.content}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(receiver.avatar)}
              displayName={receiver.firstName}
              avatarDisp={true}
            />
          )
        )}
        <div ref={scrollToBottomRef} />
      </MessageBody>
      <TextInput
        conversationId={conversation.id}
        receiver={receiver.id}
        autoFocus
        token={token}
      />
    </StyledPaper>
  );
}

export default ChatBox;
