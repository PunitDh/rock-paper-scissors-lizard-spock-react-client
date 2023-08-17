import axios from "axios";

export const uploadFile = (formData) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/video`, formData)
    .then((response) => console.log(response.data))
    .catch(console.error);
};
