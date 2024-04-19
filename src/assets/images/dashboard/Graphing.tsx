export default function Graphing(props: {
  [key: string]: string;
}): React.ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill={props.fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="icon icon-tabler icon-tabler-chart-sankey"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M3 3v18h18M3 6h18M3 8c10 0 8 9 18 9"></path>
    </svg>
  );
}
