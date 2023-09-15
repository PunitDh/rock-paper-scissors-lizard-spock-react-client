import { useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { Token } from "./types";

export default function useToken(): Token {
  return useContext(TokenContext);
}
