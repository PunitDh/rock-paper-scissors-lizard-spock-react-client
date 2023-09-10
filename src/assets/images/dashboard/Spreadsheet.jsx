function SpreadSheet(props) {
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
      className="icon icon-tabler icon-tabler-file-spreadsheet"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M14 3v4a1 1 0 001 1h4"></path>
      <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"></path>
      <path d="M8 11h8v7H8zM8 15h8M11 11v7"></path>
    </svg>
  );
}

export default SpreadSheet;
