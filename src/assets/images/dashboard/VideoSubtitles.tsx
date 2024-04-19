export default function VideoSubtitles(props: {
  [key: string]: string;
}): JSX.Element {
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
      className="icon icon-tabler icon-tabler-badge-cc"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
      <path d="M10 10.5a1.5 1.5 0 00-3 0v3a1.5 1.5 0 003 0M17 10.5a1.5 1.5 0 00-3 0v3a1.5 1.5 0 003 0"></path>
    </svg>
  );
}
