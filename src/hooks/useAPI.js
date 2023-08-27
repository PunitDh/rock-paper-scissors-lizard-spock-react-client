import { useContext } from "react";
import { APIContext } from "src/context/APIContext";

export default function useAPI() {
  return useContext(APIContext);
}
