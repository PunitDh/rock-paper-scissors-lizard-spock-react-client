import Chart from "react-apexcharts";
import { CalculatorBox } from "../styles";
import { State } from "../types";

type Props = {
  state: State;
};

const GraphBox = ({ state }: Props) => {
  const chartOptions = {
    series: [
      {
        name: "y=" + state.input.join(""),
        data: state.outputs,
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
        categories: state.outputs.map((it) => it.x),
        tickAmount: 1,
        tickPlacement: "on",
      },
    } as ApexCharts.ApexOptions,
  };

  return (
    <CalculatorBox
      flexDirection="row"
      width="100%"
      justifyContent="flex-end"
      gap="0.5rem"
      alignItems="flex-start"
    >
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="line"
        height={300}
        width={450}
      />
    </CalculatorBox>
  );
};

export default GraphBox;
