import { uniqueId } from "lodash";
import { DashboardImage } from "../../assets";
import { LinkCardProps } from "./types";
import { listOf } from "../../utils/List";

export const AppList = listOf<LinkCardProps>(
  {
    id: uniqueId("app-"),
    to: "/apps/rpsls",
    title: "Rock Paper Scissors Lizard Spock",
    Icon: DashboardImage.Rpsls,
    description: "Rock Paper Scissors Lizard Spock",
  },
  {
    id: uniqueId("app-"),
    to: "/apps/tictactoe",
    title: "Tic Tac Toe",
    Icon: DashboardImage.TicTacToe,
    description: "Tic Tac Toe (coming soon)",
    comingSoon: true,
  },
  {
    id: uniqueId("app-"),
    to: "/utils/calculator",
    title: "React Calculator",
    Icon: DashboardImage.Calculator,
    description: "A calculator made with React",
  },
  {
    id: uniqueId("app-"),
    to: "/utils/color",
    title: "Color Picker",
    Icon: DashboardImage.ColorPicker,
    description: "A color picker",
  },
  {
    id: uniqueId("app-"),
    to: "/utils/recipes",
    title: "Flavor Match",
    Icon: DashboardImage.Recipes,
    description: "A recipe recommender",
  },
  {
    id: uniqueId("app-"),
    to: "/utils/sheets",
    title: "Spreadsheet",
    Icon: DashboardImage.Spreadsheet,
    description: "Spreadsheet made with React",
  },
  {
    id: uniqueId("app-"),
    to: "/utils/rest",
    title: "Get Sum Rest",
    Icon: DashboardImage.Rest,
    description: "A Postman / Insomnia clone",
  },
  {
    id: uniqueId("app-"),
    to: "/utils/video",
    title: "Video Subtitles",
    Icon: DashboardImage.VideoSubtitles,
    description: "Generate subtitles for a video in any language",
  },
  {
    id: uniqueId("app-"),
    to: "/utils/audio",
    title: "Audio Extractor",
    Icon: DashboardImage.AudioExtractor,
    description: "Extract audio from a video file",
  }
).sortBy((it) => it.title);
