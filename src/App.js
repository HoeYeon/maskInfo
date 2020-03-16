import React, { useEffect } from "react";
import Main from "./Main";
import Map from "./Map";
function App() {
  return (
    <span role="img" aria-label="corona">
      😷🤧😷😷😷
      <Main></Main>
      <div id="map" style={{ width: "100vw", height: "60vh" }} />
      <Map></Map>
    </span>
  );
}

export default App;
