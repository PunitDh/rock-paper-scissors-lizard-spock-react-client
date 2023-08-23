import { Download } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { Bold } from "src/components/shared/styles";
import {
  IndentedBox,
  ResponsiveFlexBox,
  ResponsiveTextField,
  ResponsiveTypography,
} from "../styles";

const Subtitles = ({ subtitles }) => (
  <ResponsiveFlexBox flexDirection="column" gap="1rem" width="100%">
    <ResponsiveTypography variant="subtitle1">Output:</ResponsiveTypography>
    <IndentedBox>
      <ResponsiveTextField
        label="Subtitles"
        multiline
        minRows={15}
        InputProps={{ style: { fontFamily: "monospace" } }}
        defaultValue={subtitles.translation}
      />
    </IndentedBox>

    <ResponsiveTypography variant="subtitle1">
      Download Subtitles as a <code>.srt</code> file
    </ResponsiveTypography>
    <IndentedBox>
      <Tooltip title="Download subtitles file">
        <a
          href={`${process.env.REACT_APP_SERVER_URL}/${subtitles.location}`}
          download
        >
          <Fab color="primary" aria-label="add">
            <Download />
          </Fab>
        </a>
      </Tooltip>
    </IndentedBox>

    <ResponsiveTypography variant="subtitle1">
      <Bold>Note: Files will be stored on the server for 24 hours.</Bold>
    </ResponsiveTypography>
  </ResponsiveFlexBox>
);

export default Subtitles;
