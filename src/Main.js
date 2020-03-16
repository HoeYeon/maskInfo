import React from "react";
import { maskInfo } from "./api";

const getTest = () => {
  const getStores = async () => {
    const store = await maskInfo.stores();
    const sales = await maskInfo.sales();
    const geo = await maskInfo.storesByGeo();
    const addr = await maskInfo.storesByAddr();

    console.log(store);
    console.log(sales);
    console.log(geo);
    console.log(addr);
  };

  getStores();
  return <div>hello</div>;
};

export default getTest;
