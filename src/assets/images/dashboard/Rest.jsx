function Rest(props) {
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
      className="icon icon-tabler icon-tabler-api"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M4 13h5M12 16V8h3a2 2 0 012 2v1a2 2 0 01-2 2h-3M20 8v8M9 16v-5.5a2.5 2.5 0 00-5 0V16"></path>
    </svg>
  );
}

export default Rest;
