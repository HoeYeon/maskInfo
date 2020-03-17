import React, { useEffect } from "react";
import GetPosition from "./Getloc";
import { CreateInfo } from "./CreateInfo";
import { maskInfo } from "./api";

const SetMap = () => {
  const tmp = async () => {
    const {
      coords: { latitude, longitude }
    } = await GetPosition();
    console.log(latitude, longitude);
    let container = document.getElementById("map"),
      options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3
      };
    const map = new window.kakao.maps.Map(container, options),
      // show Current Location
      markerPosition = new window.daum.maps.LatLng(latitude, longitude),
      marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
    marker.setMap(map);

    const {
      data: { stores }
    } = await maskInfo.storesByGeo(latitude, longitude);
    console.log(stores);
    await stores.map(data => {
      const { lat, lng, name, remain_stat, stock_at } = data;
      CreateInfo(map, lat, lng, { name, remain_stat, stock_at });
    });

    map.setCenter(options.center);
  };
  tmp();

  return "Yeah";
};

export default SetMap;
