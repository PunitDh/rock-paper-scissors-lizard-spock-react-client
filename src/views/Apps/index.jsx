import PageContainer from "src/components/container/PageContainer";
import LinkCard from "./components/LinkCard";
import { ResponsiveFlexBox } from "../Utils/VideoConverter/styles";
import DashboardCard from "src/components/shared/DashboardCard";
import { DashboardImage } from "src/assets";

const Apps = () => (
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
        <LinkCard
          to="/games/rpsls"
          title="Rock Paper Scissors Lizard Spock"
          Icon={DashboardImage.Rpsls}
          description="Rock Paper Scissors Lizard Spock"
        />
        <LinkCard
          to="/games/tictactoe"
          title="Tic Tac Toe"
          Icon={DashboardImage.TicTacToe}
          description="Tic Tac Toe (coming soon)"
        />
        <LinkCard
          to="/utils/calculator"
          title="React Calculator"
          Icon={DashboardImage.Calculator}
          description="A calculator made with React"
        />
        <LinkCard
          to="/utils/color"
          title="Color Picker"
          Icon={DashboardImage.ColorPicker}
          description="A color picker"
        />
        <LinkCard
          to="/utils/sheets"
          title="Spreadsheet"
          Icon={DashboardImage.Spreadsheet}
          description="Spreadsheet made with React"
        />
        <LinkCard
          to="/utils/video"
          title="Video Subtitles"
          Icon={DashboardImage.VideoSubtitles}
          description="Generate subtitles for a video in any language"
        />
      </ResponsiveFlexBox>
    </DashboardCard>
  </PageContainer>
);

export default Apps;
