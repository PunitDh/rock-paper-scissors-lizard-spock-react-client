import Chart from "react-apexcharts";
import { CalculatorBox } from "../styles";
import { Action, Coord, State } from "../types";
import { FormControl, TextField } from "@mui/material";
import FlexBox from "../../../../../components/shared/FlexBox";
import { Dispatch, useState } from "react";
import { setGraphRange } from "../actions";
import { isBetween, linearInterpolate } from "../utils";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

type Closest = {
  low: Coord;
  high: Coord;
};

const GraphBox = ({ state, dispatch }: Props) => {
  const handleGraphRangeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setGraphRange(e.target.name, Number(e.target.value)));
  const [solveY, setSolveY] = useState<number>(0);
  const [solvedX, setSolvedX] = useState<number>(state.graph.coords[0]?.x || 0);

  const handleSolve = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSolveY(value);
    const closest: Closest = {
      low: {
        x: 0,
        y: 0,
      },
      high: {
        x: 0,
        y: 0,
      },
    };

    let x = solvedX;

    for (let i = 0; i < state.graph.coords.length - 1; i++) {
      const valueIsBetween = isBetween(
        value,
        state.graph.coords[i].y,
        state.graph.coords[i + 1].y,
      );
      if (valueIsBetween) {
        closest.low = state.graph.coords[i];
        closest.high = state.graph.coords[i + 1];
        x = linearInterpolate(value, closest.low, closest.high);
        break;
      } else if (value === state.graph.coords[i].y) {
        x = state.graph.coords[i].x;
        break;
      }
    }
    console.log({ closest });
    setSolvedX(x);
  };

  const chartOptions = {
    series: [
      {
        name: "y=" + state.input.join(""),
        data: state.graph.coords,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: "#adb0bb",
        events: {
          click: function(event, chartContext, config) {
            console.log(event, chartContext, config);
          },
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "y=" + state.input.join(""),
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
      xaxis: {
        type: "numeric",
        categories: state.graph.coords.map((it) => it.x),
        tickAmount: 1,
        tickPlacement: "on",
      },
    } as ApexCharts.ApexOptions,
  };

  return (
    <CalculatorBox
      flexDirection="column"
      width="100%"
      justifyContent="flex-end"
      gap="0.5rem"
      alignItems="flex-start"
    >
      <FlexBox gap="0.5rem" width="100%" justifyContent="space-between">
        <FormControl fullWidth>
          <TextField
            value={state.graph.minX}
            onChange={handleGraphRangeChange}
            type="number"
            name="minX"
            size="small"
            label="Min Range"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            value={state.graph.maxX}
            onChange={handleGraphRangeChange}
            type="number"
            name="maxX"
            size="small"
            label="Max Range"
          />
        </FormControl>
      </FlexBox>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="line"
        height={300}
        width={450}
      />
      <FlexBox gap="0.5rem" width="100%" justifyContent="space-between">
        <FormControl fullWidth>
          <TextField
            value={solveY}
            onChange={handleSolve}
            type="number"
            // name="minX"
            size="small"
            label="y-value"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            value={solvedX}
            // onChange={handleSolve}
            type="number"
            // name="maxX"
            size="small"
            // label="x-value"
          />
        </FormControl>
      </FlexBox>
    </CalculatorBox>
  );
};

export default GraphBox;
