import React, { useEffect } from "react";
import GetPosition from "./Getloc";
const GetMap = () => {
  const tmp = async () => {
    const {
      coords: { latitude, longitude }
    } = await GetPosition();
    console.log(latitude, longitude);
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);
    const markerPosition = new window.daum.maps.LatLng(latitude, longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  };
  tmp();

  return "Yeah";
};

export default GetMap;
