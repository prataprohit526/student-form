import React from "react";
import GridLoader from "react-spinners/ClipLoader";

const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinnner() {

  return (
    <div className="sweet-loading">
      <GridLoader color="red" loading cssOverride={override} size={100} />
    </div>
  );
}

export default Spinnner;