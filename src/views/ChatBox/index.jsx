import { Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import { MessageLeft } from "./MessageLeft";
import { MessageRight } from "./MessageRight";
import { TextInput } from "./TextInput";
import { Close } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useToken } from "src/hooks";
import { getAvatar } from "src/data";

const Container = styled.div({
  position: "absolute",
});

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
  position: "fixed",
  zIndex: "99",
  bottom: 0,
  right: "1rem",
}));

const MessageBody = styled(Paper)({
  width: "calc( 100% - 20px )",
  margin: 10,
  overflowY: "scroll",
  height: "calc( 100% - 80px )",
});

function ChatBox() {
  const [show, setShow] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState();
  const toolbarRef = useRef();
  const token = useToken();

  useEffect(() => {
    if (toolbarRef.current) {
      setToolbarHeight(getComputedStyle(toolbarRef.current));
    }
  }, [show]);

  return (
    <Container>
      <StyledPaper show={show} toolbarheight={toolbarHeight?.height}>
        <ToolbarStyled ref={toolbarRef} id="chat-toolbar">
          <Typography>Chat</Typography>
          <Tooltip title="Close chat">
            <CloseButton onClick={() => setShow((show) => !show)} />
          </Tooltip>
        </ToolbarStyled>
        <MessageBody id="style-1">
          <MessageLeft
            message=""
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName=""
            avatarDisp={true}
          />
          <MessageLeft
            message=""
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName=""
            avatarDisp={false}
          />
          <MessageRight
            message=""
            timestamp="MM/DD 00:00"
            photoURL={getAvatar(token.decoded.avatar).image}
            displayName=""
            avatarDisp={true}
          />
          <MessageRight
            message=""
            timestamp="MM/DD 00:00"
            photoURL={getAvatar(token.decoded.avatar).image}
            displayName=""
            avatarDisp={true}
          />
        </MessageBody>
        <TextInput token={token} />
      </StyledPaper>
    </Container>
  );
}

export default ChatBox;
