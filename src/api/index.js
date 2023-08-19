import axios from "axios";

export const api = {
  translateSubtitles: (formData) =>
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/video/subtitles/translate`,
      formData
    ),
};
