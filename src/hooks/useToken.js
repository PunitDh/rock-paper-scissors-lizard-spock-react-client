import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, setToken } from "src/redux/playerSlice";

export default function useToken() {
  const { token } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  return {
    jwt: token,
    decoded: token && jwtDecode(token),
    set: (token) => dispatch(setToken(token)),
    clear: () => dispatch(clearToken()),
  };
}
