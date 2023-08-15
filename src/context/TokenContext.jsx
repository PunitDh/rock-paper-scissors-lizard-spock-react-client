import jwtDecode from "jwt-decode";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, setToken } from "src/redux/playerSlice";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const { token } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  return (
    <TokenContext.Provider
      value={{
        jwt: token,
        decoded: token && jwtDecode(token),
        set: (token) => dispatch(setToken(token)),
        clear: () => dispatch(clearToken()),
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
