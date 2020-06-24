import React from "react";
import Map from "./MapContainer";
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
          height: "50vh",
          margin: "1em 1em 1.5em 0.8em",
          borderRadius: "10px",
          border: "1px solid #57606f",
          boxShadow: "1px 1px",
        }}
      />
      <Map></Map>
    </>
  );
}

export default App;
