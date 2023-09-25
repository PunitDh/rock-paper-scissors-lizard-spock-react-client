import { ConvertAction } from "./Convert/actions";

export type State = {
  video: null;
  language: string;
  format: SubtitleFormat;
  debugMode: boolean;
  loading: boolean;
  updates: string[];
  subtitles: Partial<Subtitles>;
  downloadBlob: string | null;
};

export type Subtitles = {
  location: string;
  translation: string;
  format: SubtitleFormat;
};

export type SubtitleFormat = "srt" | "vtt";

export type Action = {
  type: ConvertAction;
  payload?: any;
};
