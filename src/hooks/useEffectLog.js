/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useEffectLog(fn, deps = []) {
  // console.log("Running once", fn);
  useEffect(fn, deps);
}
