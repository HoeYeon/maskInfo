import React from "react";
import styled from "styled-components";
import Display, { sortingStore } from "./DisplayStore";

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
  background-color: ${(props) => (props.isStock ? "#ffeaa7" : "#ffffff")};
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

const MapPresenter = ({
  lastUpdated,
  isStock,
  setStock,
  toggle,
  setToggle,
  stores,
  position,
  map,
}) => {
  return (
    <div>
      <Updated>
        업데이트:{" "}
        {lastUpdated ? lastUpdated.slice(5, lastUpdated.length) : null}
      </Updated>
      <Toolbar
        isStock={isStock}
        onClick={() => {
          setStock(!isStock);
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
            <Display
              stores={sortingStore(stores, position)}
              isStock={isStock}
              map={map}
            ></Display>
          )}
        </DisplayList>
      </DisplayWrapper>
    </div>
  );
};

export default MapPresenter;
