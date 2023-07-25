import jwtDecode from "jwt-decode";

export const useToken = () => {
  const token = localStorage.getItem("rpsls-token");

  return {
    token,
    decoded: token && jwtDecode(token),
    set: (token) => {
      localStorage.setItem("rpsls-token", token);
    },
    clear: () => {
      localStorage.removeItem("rpsls-token");
    },
  };
};
