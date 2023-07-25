import jwtDecode from "jwt-decode";

export default function useToken() {
  const token = localStorage.getItem("rpsls-token");

  return {
    jwt: token,
    decoded: token && jwtDecode(token),
    set: (token) => {
      localStorage.setItem("rpsls-token", token);
    },
    clear: () => {
      localStorage.removeItem("rpsls-token");
    },
  };
}
