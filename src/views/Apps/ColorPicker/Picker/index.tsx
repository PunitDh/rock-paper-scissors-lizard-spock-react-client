import { useCallback, useEffect, useReducer } from "react";
import styled from "@emotion/styled";
import { initialState, reducer } from "./reducer";
import { setCarat, setContext, setRGB, setRect } from "./actions";
import { Slider } from "@mui/material";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { ResponsiveFlexBox } from "../../../../components/shared/styles";
import { RGB } from "./types";

type CaratProps = {
  caratposition: number;
};

type OutputProps = {
  rgb: RGB;
};

const Container = styled.div({
  position: "relative",
});

const Carat = styled.div(({ caratposition }: CaratProps) => ({
  position: "absolute",
  left: `${caratposition}rem`,
  height: "calc(5rem + 4px)",
  top: "-2px",
  border: `2px solid black`,
  width: "1px",
}));

const Output = styled.div(({ rgb }: OutputProps) => ({
  border: "1px solid black",
  position: "relative",
  width: "8rem",
  height: "5rem",
  backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: `rgb(${255 - rgb.r}, ${255 - rgb.g}, ${255 - rgb.b})`,
}));

const Picker = (): React.ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const maxWidth = 32;
  const canvasWidth = 512;
  const canvasHeight = 80;

  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const setOutput = useCallback(
    (carat: number) => {
      const x =
        (carat / state.maxCarat) * (state.rect?.right! - state.rect?.left!) - 1;
      const y = (state.rect?.bottom! - state.rect?.top!) * 0.5;
      const pixel = state.context?.getImageData(x, y, 1, 1).data;
      pixel && dispatch(setRGB({ r: pixel[0], g: pixel[1], b: pixel[2] }));
    },
    [
      state.context,
      state.maxCarat,
      state.rect?.bottom,
      state.rect?.left,
      state.rect?.right,
      state.rect?.top,
    ]
  );

  useEffect(() => {
    dispatch(setCarat(state.maxCarat / 3));
  }, [state.maxCarat]);

  useEffect(() => {
    if (state.rect && state.context) {
      setOutput(state.carat);
    }
  }, [setOutput, state.carat, state.context, state.rect]);

  const handleChange = (e: Event): void => {
    const newCarat = parseInt((e.target as HTMLInputElement).value);
    dispatch(setCarat(newCarat));
    setOutput(newCarat);
  };

  const handleClick = (e: React.MouseEvent) => {
    const x = Math.floor(e.nativeEvent.offsetX);
    const y = Math.floor(e.nativeEvent.offsetY);
    const pixel = state.context?.getImageData(x, y, 1, 1).data;
    pixel && setRGB({ r: pixel[0], g: pixel[1], b: pixel[2] });
    dispatch(
      setCarat((x / (state.rect?.right! - state.rect?.left!)) * state.maxCarat)
    );
  };

  const canvas = useCallback((node: HTMLCanvasElement) => {
    const ctx = node?.getContext("2d");
    if (ctx) {
      ctx.canvas.width = canvasWidth;
      ctx.canvas.height = canvasHeight;
      dispatch(setRect(node?.getBoundingClientRect()));
      const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
      gradient.addColorStop(0.0, "#000000");
      gradient.addColorStop(0.25, "#0000ff");
      gradient.addColorStop(0.5, "#00ff00");
      gradient.addColorStop(0.75, "#ff0000");
      gradient.addColorStop(1.0, "#ffffff");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      dispatch(setContext(ctx));
    }
  }, []);

  return (
    <DashboardCard sx={{ height: "100%" }} title="Color Picker">
      <ResponsiveFlexBox
        flexDirection="column"
        gap="2rem"
        alignItems="flex-start"
      >
        <Container>
          <canvas ref={canvas} onClick={handleClick} />
          <Carat caratposition={(state.carat / state.maxCarat) * maxWidth} />
        </Container>
        <Slider
          min={0}
          max={state.maxCarat}
          defaultValue={state.maxCarat / 3}
          value={state.carat}
          sx={{ width: canvasWidth }}
          onChange={handleChange}
        />
        <Output rgb={state.rgb}>
          <span>{`rgb(${state.rgb.r}, ${state.rgb.g}, ${state.rgb.b})`}</span>
          <span>{rgbToHex(state.rgb.r, state.rgb.g, state.rgb.b)}</span>
        </Output>
      </ResponsiveFlexBox>
    </DashboardCard>
  );
};

export default Picker;
