import styled from "@emotion/styled";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  FormGroup,
  FormLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useAPI } from "../../../hooks";

const Toggle = styled(Typography)({
  cursor: "pointer",
  userSelect: "none",
});

const FeatureToggles = () => {
  const { siteSettings } = useSelector((state) => state.site);
  const api = useAPI();

  const handleToggle = (e) => {
    api.setSiteSettings({
      siteSettings: { [e.target.name]: e.target.checked },
    });
  };

  const settings = [
    {
      title: "Conversations",
      name: "conversations",
      id: "conversations-toggle",
      selector: siteSettings.conversations,
    },
    {
      title: "Video Subtitle Generator",
      name: "videoConverter",
      id: "video-converter-toggle",
      selector: siteSettings.videoConverter,
    },
  ];

  return (
    <DashboardCard title="Feature Toggles">
      <FormGroup>
        <Table>
          <TableBody>
            {settings.map((setting) => (
              <TableRow key={setting.id}>
                <TableCell>
                  <FormLabel htmlFor={setting.id}>
                    <Toggle variant="button">{setting.title}</Toggle>
                  </FormLabel>
                </TableCell>
                <TableCell>
                  <Switch
                    id={setting.id}
                    name={setting.name}
                    onChange={handleToggle}
                    defaultChecked={setting.selector}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FormGroup>
    </DashboardCard>
  );
};

export default FeatureToggles;
