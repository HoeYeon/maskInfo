import React, { useEffect, useState } from "react";
import GetPosition from "./Getloc";
import { CreateInfo } from "./CreateInfo";
import { maskInfo } from "./api";
import Display from "./DisplayStore";
import styled from "styled-components";

const Wrap = styled.div`
  position: relative;
`;
const DisplayList = styled.div`
  position: fixed;
  width: 90vw;
  overflow: auto;
  height: 26%;
  padding-left: 10px;
`;
const Column = styled.div`
  padding-left: 10px;
  padding-bottom: 5px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  font-weight: bold;
`;

const SetMap = () => {
  const [map, setMymap] = useState(null);
  const [stores, setStore] = useState(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  // 위치정보 불러오기
  useEffect(() => {
    const init = async () => {
      const {
        coords: { latitude, longitude }
      } = await GetPosition();
      setPosition({ latitude, longitude });
    };
    init();
  }, []);

  useEffect(() => {
    const init2 = async () => {
      const { latitude, longitude } = position;
      let container = document.getElementById("map"),
        options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3
        };
      const map = new window.kakao.maps.Map(container, options);
      setMymap(map);

      // show Current Location
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude),
        marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
      marker.setMap(map);

      // 위치기반 약국 정보 불러오기
      const {
        data: { stores }
      } = await maskInfo.storesByGeo(latitude, longitude);
      setStore(stores);

      //map.setCenter(options.center);
    };
    init2();
  }, [position]);

  //약국 정보가 업데이트 되면 업데이트!
  useEffect(() => {
    if (stores != null) {
      stores.map(data => {
        const { lat, lng, name, remain_stat, stock_at } = data;
        CreateInfo(map, lat, lng, { name, remain_stat, stock_at });
      });
    }
  }, [stores]);

  return (
    <div>
      <Column>
        <div>약국명칭</div>
        <div>입고시간</div>
        <div>재고현황</div>
      </Column>
      <Wrap>
        <DisplayList>
          {stores
            ? stores.map(data => (
                <Display
                  key={data.name}
                  name={data.name}
                  remain_stat={data.remain_stat}
                  stock_at={data.stock_at}
                ></Display>
              ))
            : "Load"}
        </DisplayList>
      </Wrap>
    </div>
  );
};

export default SetMap;
