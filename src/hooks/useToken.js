import { useContext } from "react";
import { TokenContext } from "src/context/TokenContext";

export default function useToken() {
  return useContext(TokenContext);
}
