import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { useAPI } from "src/hooks";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import LogActions from "./LogActions";

const LogMessage = styled(Typography)(({ theme, type }) => ({
  color: theme.palette[type].main,
  fontFamily: "monospace",
  Width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  marginTop: "0.5rem",
  display: "block",
  overflowWrap: "anywhere",
}));

const APILogs = () => {
  const [request, setRequest] = useState({
    type: "ALL",
    limit: 50,
    time: 0,
  });
  const [logs, setLogs] = useState([]);
  const scrollRef = useRef();
  const api = useAPI();

  const handleClearLogs = () => {
    api.clearLogs().then((data) => setLogs(data.payload));
  };

  const handleRequestChange = (e) => {
    setRequest((request) => ({ ...request, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    api.getLogs(request).then((data) => setLogs(data.payload));
  }, [request]);

  useEffect(() => {
    // scrollRef.current?.scrollIntoView();
  }, [logs.length]);

  console.log(logs);

  return (
    <DashboardCard
      title="API Logs"
      sx={{
        backgroundColor: "#222",
        color: "white",
        maxHeight: "50rem",
        overflowY: "auto",
      }}
      action={
        <LogActions
          request={request}
          onSelect={handleRequestChange}
          onClearLogs={handleClearLogs}
        />
      }
    >
      {logs.map((message) => (
        <LogMessage type={message.type} key={message.id}>
          {message.content}
        </LogMessage>
      ))}
      <div ref={scrollRef} />
    </DashboardCard>
  );
};

export default APILogs;
