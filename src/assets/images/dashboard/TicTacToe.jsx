function TicTacToe(props) {
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
      className="icon icon-tabler icon-tabler-tic-tac"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M4 6a2 2 0 104 0 2 2 0 10-4 0M3 12h18M12 3v18M4 16l4 4M4 20l4-4M16 4l4 4M16 8l4-4M16 18a2 2 0 104 0 2 2 0 10-4 0"></path>
    </svg>
  );
}

export default TicTacToe;
