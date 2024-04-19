import { Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { TextInput } from "./TextInput";
import { Close } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { MessageRight } from "./MessageRight";
import { MessageLeft } from "./MessageLeft";
import { useDispatch } from "react-redux";
import { ChatBoxStatus, formatDate } from "../constants";
import { useToken } from "../../../hooks";
import {
  closeConversation,
  minimizeConversation,
  openConversation,
} from "../../../redux/conversationSlice";
import { getAvatar } from "../../../assets";
import { Conversation, Message } from "../../../redux/types";

type Props = {
  conversation: Conversation;
};

const CloseButton = styled(Close)(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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
  zIndex: "5",
}));

type StyledPaperProps = {
  maximized: number;
  toolbarheight: number;
};

const StyledPaper = styled(Paper)(
  ({ maximized, toolbarheight }: StyledPaperProps) => ({
    width: "80dvw",
    height: maximized > 0 ? "80dvh" : toolbarheight,
    maxWidth: "300px",
    maxHeight: "500px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "-1rem -1rem 3rem -1rem rgba(0,0,0,0.7)",
    borderTopRightRadius: "0.5rem",
    borderTopLeftRadius: "0.5rem",
    zIndex: "1500",
  })
);

const MessageBody = styled(Paper)({
  width: "calc(100% - 20px)",
  margin: 10,
  overflowY: "scroll",
  height: "calc(100% - 80px)",
});

function ChatBox({ conversation }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [toolbarHeight, setToolbarHeight] = useState<number>(0);
  const token = useToken();
  const { messages } = conversation;

  const toolbarRef = useCallback((node: HTMLDivElement) => {
    const rect = node?.getBoundingClientRect();
    rect && setToolbarHeight(rect.bottom - rect.top);
  }, []);

  const scrollToBottomRef = useCallback(
    (node: HTMLDivElement) => node?.scrollIntoView(),
    [messages.length]
  );

  const isMinimized = conversation.status === ChatBoxStatus.MINIMIZED;
  const isOpen = conversation.status === ChatBoxStatus.OPEN;

  const closeChatBox = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(closeConversation(conversation));
  };

  const toggleMinimize = () => {
    if (isOpen) return dispatch(minimizeConversation(conversation));
    if (isMinimized) return dispatch(openConversation(conversation));
  };

  const receiver = conversation.players.find(
    (player) => player.id !== token.decoded?.id
  );

  const allRead = messages
    .filter((message) => message.sender !== token.decoded?.id)
    .every((message) => message.read);

  return token.decoded &&
    toolbarHeight !== null &&
    toolbarHeight !== undefined &&
    receiver ? (
    <StyledPaper maximized={Number(isOpen)} toolbarheight={toolbarHeight}>
      <ToolbarStyled ref={toolbarRef} onClick={toggleMinimize}>
        <Typography>Chat with {receiver.firstName}</Typography>
        <Tooltip title="Close chat">
          <CloseButton onClick={closeChatBox} />
        </Tooltip>
      </ToolbarStyled>
      <MessageBody>
        {messages.map((message: Message) =>
          message.sender === token.decoded!.id ? (
            <MessageRight
              key={message._id}
              content={message.content}
              read={message.read}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(token.decoded!.avatar)!}
              displayName={token.decoded!.firstName}
            />
          ) : (
            <MessageLeft
              key={message._id}
              content={message.content}
              read={message.read}
              timestamp={formatDate(message.createdAt)}
              photoURL={getAvatar(receiver.avatar)!}
              displayName={receiver.firstName}
            />
          )
        )}
        <div ref={scrollToBottomRef} />
      </MessageBody>
      <TextInput
        conversationId={conversation.id}
        receiver={receiver.id}
        allRead={allRead}
      />
    </StyledPaper>
  ) : (
    <></>
  );
}

export default ChatBox;
