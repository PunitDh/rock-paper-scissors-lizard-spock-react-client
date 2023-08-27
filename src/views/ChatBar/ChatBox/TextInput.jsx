import { Button, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useConversation, usePlayer } from "src/hooks";
import { useState } from "react";

const Form = styled.form(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "95%",
  margin: `${theme.spacing(0)} auto`,
  gap: "0.5rem",
  padding: "0 0 0.5rem 0",
}));

const MessageField = styled(TextField)({
  width: "100%",
});

export const TextInput = ({ conversationId, receiver, allRead }) => {
  const player = usePlayer();
  const [messageLength, setMessageLength] = useState(0);
  const conversation = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const request = {
      conversationId,
      receiver,
      message,
    };
    player.sendMessage(request);
    e.target.reset();
    setMessageLength(0);
  };

  const handleMarkAsRead = () => {
    if (!allRead) {
      conversation.markAsRead({ conversationId });
    }
  };

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <MessageField
        id="message-content"
        name="message"
        placeholder="Enter a message"
        required
        autoFocus
        onFocus={handleMarkAsRead}
        onChange={(e) => setMessageLength(e.target.value.length)}
      />
      <Button
        disabled={!messageLength}
        variant="contained"
        color="primary"
        type="submit"
      >
        <Send />
      </Button>
    </Form>
  );
};
