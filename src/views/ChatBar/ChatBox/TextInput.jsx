import { Button, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import styled from "@emotion/styled";
import { usePlayer } from "src/hooks";

const WrapForm = styled.form(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "95%",
  margin: `${theme.spacing(0)} auto`,
  gap: "0.5rem",
  padding: "0 0 0.5rem 0",
}));

const WrapText = styled(TextField)({
  width: "100%",
});

export const TextInput = ({ conversationId, receiver, token, textfieldRef }) => {
  const player = usePlayer();

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      conversationId,
      receiver,
      message: e.target.message.value,
      sender: token.decoded.id,
    };
    player.sendMessage(request);
    e.target.reset();
  };

  return (
    <WrapForm noValidate autoComplete="off" onSubmit={handleSubmit}>
      <WrapText
        id="standard-text"
        name="message"
        placeholder="Enter a message"
        required
        ref={textfieldRef}
      />
      <Button variant="contained" color="primary">
        <Send />
      </Button>
    </WrapForm>
  );
};
