import React, { useEffect, useState } from "react";
import GetPosition from "./Getloc";
import { CreateInfo } from "./CreateInfo";
import { maskInfo } from "./api";
import MapPresenter from "./MapPresenter";
import { sortingStore } from "./DisplayStore";

const storeMarkers = [];
const SetMap = () => {
  const [map, setMymap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [stores, setStore] = useState(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [isStock, setStock] = useState(false);
  const [lastUpdated, setLast] = useState(null);
  const [toggle, setToggle] = useState(true);

  // Set Loc & get Drug
  useEffect(() => {
    const clearMap = () => {
      if (stores && storeMarkers.length > 0) {
        stores.map((data, idx) => storeMarkers[idx].setMap(null));
      }
    };
    const init = async () => {
      clearMap();
      try {
        const {
          coords: { latitude, longitude },
        } = await GetPosition();
        setPosition({ latitude, longitude });
        let {
          data: { stores },
        } = await maskInfo.storesByGeo(latitude, longitude);

        setStore(sortingStore(stores, position));
        stores.length > 0 ? setLast(stores[0].created_at) : setLast(null);

        const container = document.getElementById("map"),
          options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 4,
          };
        if (map) {
          map.panTo(options.center);
        } else {
          const maps = new window.kakao.maps.Map(container, options);
          setMymap(maps);
        }
      } catch {
        alert("GPS를 켜주세요!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    };
    init();
  }, [toggle, map]);

  // setting current loc marker
  useEffect(() => {
    const { latitude, longitude } = position;

    // show Current Location
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const markers = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    if (marker) marker.setMap(null);
    markers.setMap(map);
    setMarker(markers);
  }, [position, map]);

  //get store info
  useEffect(() => {
    if (stores != null) {
      stores.map((data) => {
        const { lat, lng, name, remain_stat } = data;
        const storemarker = CreateInfo(map, lat, lng, {
          name,
          remain_stat,
        });
        storeMarkers.push(storemarker);
        return "";
      });
    }
  }, [stores, map]);

  //mark store at map
  useEffect(() => {
    if (stores && storeMarkers.length > 0) {
      stores.map((data, idx) =>
        !isStock
          ? storeMarkers[idx].setMap(map)
          : data.remain_stat &&
            data.remain_stat !== "break" &&
            data.remain_stat !== "empty"
          ? storeMarkers[idx].setMap(map)
          : storeMarkers[idx].setMap(null)
      );
    }
  }, [isStock, map, stores]);

  return (
    <MapPresenter
      lastUpdated={lastUpdated}
      isStock={isStock}
      toggle={toggle}
      stores={stores}
      position={position}
      map={map}
      setToggle={setToggle}
      setStock={setStock}
    ></MapPresenter>
  );
};

export default SetMap;
