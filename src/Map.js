import React, { useEffect, useState } from "react";
import GetPosition from "./Getloc";
import { CreateInfo } from "./CreateInfo";
import { maskInfo } from "./api";
import Display from "./DisplayStore";
import styled from "styled-components";

const DisplayWrapper = styled.div`
  position: relative;
  margin-left: 5px;
`;
const DisplayList = styled.div`
  position: fixed;
  width: 90vw;
  overflow: auto;
  height: 33vh;
  margin-top: 3px;
  margin-left: 5px;
  padding-left: 8px;
`;
const Column = styled.div`
  margin-left: 10px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 8px;
  display: grid;
  grid-template-columns: 2fr 2fr 0.9fr;
  width: 90%;
  font-weight: bold;
  font-size: 0.87em;
  background-color: #ced6e0;
  box-shadow: 1.5px 1.5px;
`;
const Toolbar = styled.button`
  position: fixed;
  z-index: 9999;
  right: 9%;
  bottom: 46%;
  padding: 5px 7px 5px 7px;
  font-size: 0.9em;
  font-weight: bold;
  background-color: ${props => (props.isStock ? "#ffeaa7" : "#ffffff")};
  border-radius: 15px;
  outline: none;
`;
const InitLoc = styled.button`
  position: fixed;
  z-index: 9999;
  right: 9%;
  bottom: 52.5%;
  padding: 5px 7px 5px 7px;
  font-size: 0.9em;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 15px;
  outline: none;
`;
const Updated = styled.div`
  position: fixed;
  right: 3%;
  top: 1.2%;
  font-weight: bold;
`;
const storeMarkers = [];
const SetMap = () => {
  const [map, setMymap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [stores, setStore] = useState(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [isStock, setStock] = useState(false);
  const [lastUpdated, setLast] = useState(null);
  const [toggle, setToggle] = useState(true);

  const clearMap = () => {
    if (stores && storeMarkers.length > 0) {
      stores.map((data, idx) => {
        storeMarkers[idx].setMap(null);
      });
    }
  };
  // Set Loc & get Drug
  useEffect(() => {
    const init = async () => {
      clearMap();
      try {
        const {
          coords: { latitude, longitude }
        } = await GetPosition();
        setPosition({ latitude, longitude });
        let {
          data: { stores }
        } = await maskInfo.storesByGeo(latitude, longitude);
        setStore(stores);
        stores.length > 0 ? setLast(stores[0].created_at) : setLast(null);

        const container = document.getElementById("map"),
          options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 4
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

  // setting marker
  useEffect(() => {
    const { latitude, longitude } = position;

    // show Current Location
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const markers = new window.kakao.maps.Marker({
      position: markerPosition
    });
    if (marker) marker.setMap(null);
    markers.setMap(map);
    setMarker(markers);
  }, [position, map]);

  useEffect(() => {
    if (stores != null) {
      stores.map(data => {
        const { lat, lng, name, remain_stat } = data;
        const storemarker = CreateInfo(map, lat, lng, {
          name,
          remain_stat
        });

        storeMarkers.push(storemarker);
      });
    }
  }, [stores, map]);

  useEffect(() => {
    if (stores && storeMarkers.length > 0) {
      stores.map((data, idx) => {
        !isStock
          ? storeMarkers[idx].setMap(map)
          : data.remain_stat &&
            data.remain_stat !== "break" &&
            data.remain_stat !== "empty"
          ? storeMarkers[idx].setMap(map)
          : storeMarkers[idx].setMap(null);
      });
    }
  }, [isStock, map, stores]);

  return (
    <div>
      <Updated>
        업데이트:{" "}
        {lastUpdated ? lastUpdated.slice(5, lastUpdated.length) : null}
      </Updated>
      <Toolbar
        isStock={isStock}
        onClick={() => {
          setStock(isStock ? false : true);
        }}
      >
        재고있음
      </Toolbar>
      <InitLoc
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        내위치
      </InitLoc>
      <DisplayWrapper>
        <Column>
          <div>약국명칭</div>
          <div>입고시간</div>
          <div>재고현황</div>
        </Column>
        <DisplayList>
          {!stores ? (
            "Load"
          ) : (
            <Display stores={stores} isStock={isStock} map={map}></Display>
          )}
        </DisplayList>
      </DisplayWrapper>
    </div>
  );
};

export default SetMap;
