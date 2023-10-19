import { ExtractAction } from "./Extract/actions";

export type State = {
  video: null;
  format: AudioFormat;
  loading: boolean;
  updates: string[];
  audio: AudioFile | null;
  downloadBlob: string | null;
};

export type AudioFile = {
  location: string;
  format: AudioFormat;
};

export type AudioFormat = "mp3";

export type Action = {
  type: ExtractAction;
  payload?: any;
};
