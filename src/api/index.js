import axios from "axios";

export const api = {
  uploadFile: (formData) =>
    axios.post(`${process.env.REACT_APP_SERVER_URL}/video`, formData),
};
