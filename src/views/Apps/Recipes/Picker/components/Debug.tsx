import React from "react";

const Debug = ({ state }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={() => console.log(state)}>Show state</button>
    </div>
  );
};

export default Debug;
