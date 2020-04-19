import React from "react";
import styled from "styled-components";

const StoreList = styled.div`
  justify-content: left;
  font-size: 0.83em;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  padding-bottom: 5px;
`;

const Store = styled.div``;
const Stock = styled.div``;
const Remain = styled.div`
  color: ${props =>
    props.remain_stat === "plenty"
      ? "#2ecc71"
      : props.remain_stat === "some"
      ? "#f1c40f"
      : props.remain_stat === "few"
      ? "#c0392b"
      : "#95a5a6"};
`;

export const sortingStore = (stores, curLoc) => {
  const { latitude, longitude } = curLoc;
  if (stores) {
    stores.sort((a, b) => {
      const cmp = a =>
        Math.sqrt(
          Math.pow(latitude - a.lat, 2) + Math.pow(longitude - a.lng, 2)
        );
      if (cmp(a) < cmp(b)) {
        return -1;
      }
      if (cmp(a) > cmp(b)) {
        return 1;
      }
      return 0;
    });
  }
  return stores;
};

export default ({ stores, isStock, map }) => {
  const store = isStock
    ? stores.filter(
        data =>
          data.remain_stat &&
          data.remain_stat !== "break" &&
          data.remain_stat !== "empty"
      )
    : stores;
  return store.length > 0
    ? store.map(data => (
        <StoreList
          key={data.code}
          onClick={() => {
            const center = new window.kakao.maps.LatLng(data.lat, data.lng);
            map.panTo(center);
          }}
        >
          <Store>{data.name}</Store>
          <Stock>
            {data.stock_at
              ? data.stock_at.slice(5, data.stock_at.length)
              : " (미정)"}
          </Stock>
          <Remain remain_stat={data.remain_stat}>
            {data.remain_stat === "plenty"
              ? "100+"
              : data.remain_stat === "some"
              ? "30~100"
              : data.remain_stat === "few"
              ? "2~30"
              : "재고없음"}
          </Remain>
        </StoreList>
      ))
    : "약국에 마스크가 없어요!";
};
