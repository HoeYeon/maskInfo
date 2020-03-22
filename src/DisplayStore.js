import React from "react";
import styled from "styled-components";

const StoreList = styled.div`
  justify-content: left;
  font-size: 14px;
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
      : props.remain_stat === "empty"
      ? "#95a5a6"
      : "#2c3e50"};
`;

export default ({ stores, isStock }) => {
  const store = isStock
    ? stores.filter(
        data => data.remain_stat !== "break" && data.remain_stat !== "empty"
      )
    : stores;
  return store.length > 0
    ? store.map(data => (
        <StoreList key={data.code}>
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
              : data.remain_stat === "empty"
              ? "재고없음"
              : "판매중지"}
          </Remain>
        </StoreList>
      ))
    : "약국에 마스크가 없어요!";
};
