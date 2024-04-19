import LinkCard from "./components/LinkCard";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { ResponsiveFlexBox } from "../../components/shared/styles";
import { AppList } from "./constants";

const Apps = (): JSX.Element => (
  <PageContainer title="Apps" description="Apps dashboard">
    <DashboardCard
      title="Apps"
      sx={{ mb: 4, height: "100dvh", overflowY: "scroll" }}
    >
      <ResponsiveFlexBox
        width="100%"
        height="50dvh"
        gap="2rem"
        flexWrap="wrap"
        reversed
      >
        {AppList.map((app) => (
          <LinkCard key={app.id} {...app} />
        ))}
      </ResponsiveFlexBox>
    </DashboardCard>
  </PageContainer>
);

export default Apps;
