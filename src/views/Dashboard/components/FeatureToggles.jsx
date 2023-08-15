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
import { useDispatch, useSelector } from "react-redux";
import useAdmin from "src/hooks/useAdmin";

const Toggle = styled(Typography)({
  cursor: "pointer",
  userSelect: "none",
});

const FeatureToggles = () => {
  const { siteSettings } = useSelector((state) => state.site);
  const admin = useAdmin();

  const handleToggle = (e) => {
    admin.setSiteSettings({
      siteSettings: { [e.target.name]: e.target.checked },
    });
  };

  return (
    <DashboardCard title="Feature Toggles">
      <FormGroup>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormLabel htmlFor="conversations-toggle">
                  <Toggle variant="button">Conversations</Toggle>
                </FormLabel>
              </TableCell>
              <TableCell>
                <Switch
                  id="conversations-toggle"
                  name="conversations"
                  onChange={handleToggle}
                  defaultChecked={siteSettings.conversations}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FormGroup>
    </DashboardCard>
  );
};

export default FeatureToggles;
