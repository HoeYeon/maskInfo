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

export default ({ name, remain_stat, stock_at }) => {
  return (
    <StoreList>
      <Store>{name}</Store>
      <Stock>{stock_at ? stock_at.slice(5, stock_at.length) : " (미정)"}</Stock>
      <Remain remain_stat={remain_stat}>
        {remain_stat === "plenty"
          ? "100+"
          : remain_stat === "some"
          ? "30~100"
          : remain_stat === "few"
          ? "2~30"
          : remain_stat === "empty"
          ? "재고없음"
          : "판매중지"}
      </Remain>
    </StoreList>
  );
};
