import { useContext } from "react";
import { TokenContext } from "../context/TokenContext";

export default function useToken() {
  return useContext(TokenContext);
}
