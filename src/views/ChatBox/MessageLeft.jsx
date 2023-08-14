import { Avatar, Typography } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import styled from "@emotion/styled";
import { deepOrange } from "@mui/material/colors";

const DisplayName = styled.div({
  marginLeft: "20px",
});

const MessageBlue = styled.div({
  position: "relative",
  marginLeft: "20px",
  marginBottom: "10px",
  padding: "10px 10px 5px 10px",
  width: "80%",
  backgroundColor: "#A8DDFD",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #97C6E3",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "15px solid #A8DDFD",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: "0",
    left: "-15px",
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "17px solid #97C6E3",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    left: "-17px",
  },
});

const MessageContent = styled(Typography)({
  padding: 0,
  margin: 0,
});

const TimeStamp = styled.div({
  fontSize: ".85em",
  fontWeight: "300",
  alignSelf: "flex-end",
});

const MessageAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
}));

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "";

  return (
    <FlexBox alignItems="flex-start" justifyContent="flex-start">
      <MessageAvatar alt={displayName} src={photoURL} />
      <div>
        <DisplayName>{displayName}</DisplayName>
        <MessageBlue>
          <FlexBox
            alignItems="space-between"
            justifyContent="space-between"
            flexDirection="column"
            height="100%"
            gap="0.1rem"
          >
            <MessageContent variant>
              {message}
              {message}
              {message}
              {message}
              {message}
            </MessageContent>

            <TimeStamp>{timestamp}</TimeStamp>
          </FlexBox>
        </MessageBlue>
      </div>
    </FlexBox>
  );
};
