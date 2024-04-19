export default function ColorPicker(props: {
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
      className="icon icon-tabler icon-tabler-color-picker"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M11 7l6 6M4 16L15.7 4.3a1 1 0 011.4 0l2.6 2.6a1 1 0 010 1.4L8 20H4v-4z"></path>
    </svg>
  );
}
