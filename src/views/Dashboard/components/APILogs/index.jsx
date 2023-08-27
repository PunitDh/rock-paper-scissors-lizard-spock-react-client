import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { useAPI } from "src/hooks";
import { useEffect, useRef, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import LogActions from "./LogActions";
import { FlexBox } from "src/components/shared/styles";

const LogTable = styled(FlexBox)({
  minHeight: "10rem",
  maxHeight: "30rem",
  overflowY: "scroll",
});

const LogMessage = styled(Typography)(({ color }) => ({
  color,
  fontFamily: "monospace",
  Width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  marginTop: "0.5rem",
  display: "block",
  overflowWrap: "anywhere",
}));

const APILogs = () => {
  const theme = useTheme();
  const [logs, setLogs] = useState([]);
  const scrollRef = useRef();
  const api = useAPI();
  const [limit, setLimit] = useState(50);
  const [logType, setLogType] = useState("ALL");

  const handleClearLogs = () => {
    api.clearLogs().then((data) => setLogs(data.payload));
  };

  useEffect(() => {
    api.getLogs(limit, logType).then((data) => setLogs(data.payload));
  }, [limit, logType]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [logs.length]);

  return (
    <DashboardCard
      title="API Logs"
      sx={{ backgroundColor: "#222", color: "white" }}
      action={
        <LogActions
          limit={limit}
          setLimit={setLimit}
          logType={logType}
          setLogType={setLogType}
          onClearLogs={handleClearLogs}
        />
      }
    >
      {
        <LogTable flexDirection="column" alignItems="flex-start">
          {logs.map((message, idx) => (
            <LogMessage color={theme.palette[message.type].main} key={idx}>
              {message.content}
            </LogMessage>
          ))}
          <div ref={scrollRef} />
        </LogTable>
      }
    </DashboardCard>
  );
};

export default APILogs;
