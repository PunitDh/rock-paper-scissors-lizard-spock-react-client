import { Avatar } from "@mui/material";
import styled from "@emotion/styled";
import { deepOrange } from "@mui/material/colors";
import { MessageContent, TimeStamp } from "./styles";
import { DoneAll } from "@mui/icons-material";
import FlexBox from "../../../components/shared/FlexBox";

type Props = {
  content: string;
  timestamp: string;
  photoURL: string;
  displayName: string;
  read: boolean;
};

const DisplayName = styled.div({
  fontSize: "0.85em",
  marginLeft: "10px",
});

const MessageBlue = styled.div({
  position: "relative",
  marginLeft: "20px",
  marginBottom: "10px",
  padding: "10px 10px 5px 10px",
  width: "100%",
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

const MessageAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  color: theme.palette.getContrastText(deepOrange[500]),
}));

export const MessageLeft = ({
  content,
  timestamp,
  photoURL,
  displayName,
  read,
}: Props) => (
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
          <MessageContent variant="body2">{content}</MessageContent>
          <TimeStamp>
            <span>{timestamp}</span>
            <span>
              {read ? (
                <DoneAll color="primary" fontSize="inherit" />
              ) : (
                <DoneAll fontSize="inherit" />
              )}
            </span>
          </TimeStamp>
        </FlexBox>
      </MessageBlue>
    </div>
  </FlexBox>
);
