import React, { useEffect } from "react";
import Main from "./Main";
import Map from "./Map";
function App() {
  return (
    <>
      <span role="img" aria-label="corona">
        😷🤧😷😷😷
      </span>
      <div
        id="map"
        style={{
          width: "90vw",
          height: "60vh",
          margin: "10px"
        }}
      />
      <Map></Map>
    </>
  );
}

export default App;
