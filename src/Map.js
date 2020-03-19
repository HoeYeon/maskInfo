import React, { useEffect, useState } from "react";
import GetPosition from "./Getloc";
import { CreateInfo } from "./CreateInfo";
import { maskInfo } from "./api";
import Display from "./DisplayStore";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed;
  top: 460px;
  width: 90vw;
  overflow: auto;
  height: 26%;
  padding-left: 10px;
`;
const Column = styled.div`
  padding-left: 10px;
  display: grid;
  grid-template-columns: 170px 150px 100px;
  font-weight: bold;
`;

const SetMap = () => {
  const [stores, setStore] = useState([]);
  useEffect(() => {
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
        markerPosition = new window.kakao.maps.LatLng(latitude, longitude),
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
      setStore(stores);
    };
    tmp();
  }, []);

  console.log(stores);

  return (
    <>
      <Column>
        <div>약국명칭</div>
        <div>입고시간</div>
        <div>재고현황</div>
      </Column>
      <Wrap>
        {stores.map(data => (
          <Display
            key={data.name}
            name={data.name}
            remain_stat={data.remain_stat}
            stock_at={data.stock_at}
          ></Display>
        ))}
      </Wrap>
    </>
  );
};

export default SetMap;
