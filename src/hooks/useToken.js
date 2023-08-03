import jwtDecode from "jwt-decode";

export default function useToken() {
  const tokenKey = "rpsls-token";
  const token = localStorage.getItem(tokenKey);

  return {
    jwt: token,
    decoded: token && jwtDecode(token),
    set: (token) => {
      localStorage.setItem(tokenKey, token);
    },
    clear: () => {
      localStorage.removeItem(tokenKey);
    },
  };
}
