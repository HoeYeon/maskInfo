import React from "react";
import Map from "./Map";
function App() {
  return (
    <>
      <span role="img" aria-label="corona" style={{ paddingLeft: "6px" }}>
        😷🤧😷🤧😷
      </span>
      <div
        id="map"
        style={{
          width: "90vw",
          height: "60vh",
          margin: "10px",
          borderRadius: "10px"
        }}
      />
      <Map></Map>
    </>
  );
}

export default App;
