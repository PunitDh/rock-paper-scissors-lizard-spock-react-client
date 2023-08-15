import { Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { TextInput } from "./TextInput";
import { Close } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useToken } from "src/hooks";
import { MessageRight } from "./MessageRight";
import { MessageLeft } from "./MessageLeft";
import { getAvatar } from "src/data";

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

function ChatBox({ conversation }) {
  const [show, setShow] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState();
  const toolbarRef = useRef();
  const token = useToken();

  useEffect(() => {
    if (toolbarRef.current) {
      setToolbarHeight(getComputedStyle(toolbarRef.current));
    }
  }, [show]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-AU", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Australia/Sydney",
    }).format(new Date(date));

  return (
    <StyledPaper show={show} toolbarheight={toolbarHeight?.height}>
      <ToolbarStyled ref={toolbarRef} id="chat-toolbar">
        <Typography>Chat</Typography>
        <Tooltip title="Close chat">
          <CloseButton onClick={() => setShow((show) => !show)} />
        </Tooltip>
      </ToolbarStyled>
      <MessageBody>
        {conversation.messages.map((message) =>
          message.sender.id === token.decoded.id ? (
            <MessageRight
              message={message.message}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(token.decoded.avatar)}
              displayName={token.decoded.firstName}
              avatarDisp={true}
            />
          ) : (
            <MessageLeft
              message={message.message}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(message.sender.avatar)}
              displayName={message.sender.firstName}
              avatarDisp={true}
            />
          )
        )}
      </MessageBody>
      <TextInput token={token} />
    </StyledPaper>
  );
}

export default ChatBox;
