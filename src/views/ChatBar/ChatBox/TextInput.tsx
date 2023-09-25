import { Button, TextField, Theme } from "@mui/material";
import { Send } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";
import { useAPI } from "../../../hooks";

type Props = {
  conversationId: string;
  receiver: string;
  allRead: boolean;
};

const Form = styled.form(({ theme }: { theme: Theme }) => ({
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

export const TextInput = ({ conversationId, receiver, allRead }: Props) => {
  const [messageLength, setMessageLength] = useState(0);
  const api = useAPI();

  const handleSubmit = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    e.preventDefault();
    const message = target.message.value;
    const request = {
      conversationId,
      receiver,
      message,
    };
    api.sendMessage(request);
    target.reset();
    setMessageLength(0);
  };

  const handleMarkAsRead = () => {
    if (!allRead) {
      api.markConversationAsRead({ conversationId });
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
