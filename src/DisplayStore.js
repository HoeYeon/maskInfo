import React from "react";
import styled from "styled-components";

const StoreList = styled.div`
  justify-content: left;
  font-size: 18px;
`;

const Store = styled.div``;
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
      <Store>
        {name} {stock_at + "\n"}
      </Store>
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
