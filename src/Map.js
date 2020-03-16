import React, { useEffect } from "react";
import Getloc from "./Getloc";
const GetMap = () => {
  const [lat, long] = Getloc();
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(lat, long),
      level: 3
    };

    new window.kakao.maps.Map(container, options);
  }, [lat, long]);

  return "";
};

export default GetMap;
